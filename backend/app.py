# import tkinter as tk
from tkinter import filedialog
import zipfile
import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers, models
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import customtkinter

pre_count = 0
post_count = 0
current_image_index = 0
pre_images = []
post_images = []
otsu_thresholds = []  # Store Otsu's thresholds for each pair of pre and post images
fig = None
canvas = None
ground_truth_pre = []  # Replace this list with your actual ground truth labels for pre-images

def create_unet_model(input_shape):
    inputs = tf.keras.Input(input_shape)
    conv1 = layers.Conv2D(32, (3, 3), activation='relu', padding='same')(inputs)
    conv1 = layers.Conv2D(32, (3, 3), activation='relu', padding='same')(conv1)
    pool1 = layers.MaxPooling2D(pool_size=(2, 2))(conv1)

    conv2 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(pool1)
    conv2 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(conv2)
    pool2 = layers.MaxPooling2D(pool_size=(2, 2))(conv2)

    conv3 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(pool2)
    conv3 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(conv3)
    pool3 = layers.MaxPooling2D(pool_size=(2, 2))(conv3)

    conv4 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(pool3)
    conv4 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(conv4)
    pool4 = layers.MaxPooling2D(pool_size=(2, 2))(conv4)

    conv5 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(pool4)
    conv5 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(conv5)

    up6 = layers.concatenate([layers.UpSampling2D(size=(2, 2))(conv5), conv4], axis=-1)
    conv6 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(up6)
    conv6 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(conv6)

    up7 = layers.concatenate([layers.UpSampling2D(size=(2, 2))(conv6), conv3], axis=-1)
    conv7 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(up7)
    conv7 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(conv7)

    up8 = layers.concatenate([layers.UpSampling2D(size=(2, 2))(conv7), conv2], axis=-1)
    conv8 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(up8)
    conv8 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(conv8)

    up9 = layers.concatenate([layers.UpSampling2D(size=(2, 2))(conv8), conv1], axis=-1)
    conv9 = layers.Conv2D(32, (3, 3), activation='relu', padding='same')(up9)
    conv9 = layers.Conv2D(32, (3, 3), activation='relu', padding='same')(conv9)

    conv10 = layers.Conv2D(1, (1, 1), activation='sigmoid')(conv9)

    model = models.Model(inputs=[inputs], outputs=[conv10])

    return model

def extract_and_process():
    global pre_count, post_count, pre_images, post_images, otsu_thresholds

    file_path = filedialog.askopenfilename(title="Select a ZIP file", filetypes=[("ZIP files", "*.zip")])

    if file_path:
        try:
            with zipfile.ZipFile(file_path, 'r') as zip_ref:
                extraction_dir = filedialog.askdirectory(title="Select extraction directory")
                if extraction_dir:
                    zip_ref.extractall(extraction_dir)
                    status_label.configure(text=f"Files extracted successfully to {extraction_dir}")

                    # Rename extracted image files based on their contents
                    extracted_files = os.listdir(extraction_dir)
                    for filename in extracted_files:
                        if filename.endswith(".jpg") or filename.endswith(".png"):
                            if "pre" in filename:
                                pre_count += 1
                                new_filename = f"pre_{pre_count}.jpg"
                            elif "post" in filename:
                                post_count += 1
                                new_filename = f"post_{post_count}.jpg"

                            new_filepath = os.path.join(extraction_dir, new_filename)

                            # Ensure the destination file does not already exist
                            while os.path.exists(new_filepath):
                                pre_count += 1 if "pre" in filename else 0
                                post_count += 1 if "post" in filename else 0
                                new_filename = f"pre_{pre_count}.jpg" if "pre" in filename else f"post_{post_count}.jpg"
                                new_filepath = os.path.join(extraction_dir, new_filename)

                            os.rename(os.path.join(extraction_dir, filename), new_filepath)

                    status_label.configure(text="")

                    # Perform image processing
                    process_images(extraction_dir)
                else:
                    status_label.configure(text="Error: No extraction directory selected")
        except zipfile.BadZipFile:
            status_label.configure(text="Error: Not a valid ZIP file")
    else:
        status_label.configure(text="Error: No file selected")

def process_images(directory):
    global pre_images, post_images, otsu_thresholds, fig, canvas

    try:
        # Load pre and post images
        pre_images = [cv2.imread(os.path.join(directory, f"pre_{i}.jpg")) for i in range(1, pre_count + 1)]
        post_images = [cv2.imread(os.path.join(directory, f"post_{i}.jpg")) for i in range(1, post_count + 1)]

        # Check if images are loaded successfully
        if any(img is None for img in pre_images + post_images):
            raise Exception("Error: Unable to load images.")

        # Ensure the number of pre and post images match
        if len(pre_images) != len(post_images):
            raise Exception("Error: Mismatched number of pre and post images.")

        # Process images and compute Otsu's threshold for each pair of pre and post images
        otsu_thresholds = []
        for pre_image, post_image in zip(pre_images, post_images):
            # Resize images to have the same dimensions
            pre_image = cv2.resize(pre_image, (post_image.shape[1], post_image.shape[0]))

            # Convert images to grayscale
            pre_image_gray = cv2.cvtColor(pre_image, cv2.COLOR_BGR2GRAY)
            post_image_gray = cv2.cvtColor(post_image, cv2.COLOR_BGR2GRAY)

            # Perform Otsu's thresholding
            _, pre_otsu_threshold = cv2.threshold(pre_image_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            _, post_otsu_threshold = cv2.threshold(post_image_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

            otsu_thresholds.append((pre_otsu_threshold, post_otsu_threshold))

        display_image(0)  # Display the first image
    except Exception as e:
        print(str(e))
        status_label.configure(text=str(e))

def calculate_metrics(index):
    pre_binary = otsu_thresholds[index][0]
    post_binary = otsu_thresholds[index][1]

    # Assuming white pixels represent damaged regions
    damaged_pre = np.sum(pre_binary == 255)
    damaged_post = np.sum(post_binary == 255)

    # Calculate precision ratio
    precision_ratio = 0 if damaged_pre == 0 else damaged_post / damaged_pre

    # Update the labels to display precision ratio
    f1_label.configure(text=f"Precision Ratio: {precision_ratio:.2f}")

    # Calculate accuracy
    accuracy = np.sum(np.logical_and(pre_binary == 255, post_binary == 255)) / np.sum(post_binary == 255)

    metrics_label.configure(text=f"Precision Ratio: {precision_ratio:.4f}   Accuracy: {accuracy*100:.2f}%")

def display_image(index, background_color='#242424', text_color='white', graph_number_color='white'):
    global fig, canvas, current_image_index

    if fig is not None:
        fig.clear()
    else:
        fig = plt.figure(figsize=(12, 6), facecolor=background_color)

     
    plt.subplots_adjust(hspace=0.3)

    # Display detailed images
    plt.subplot(2, 3, 1)
    plt.imshow(cv2.cvtColor(pre_images[index], cv2.COLOR_BGR2RGB))
    plt.title('Pre Image', fontweight='bold', fontsize=12, color=text_color)
    plt.tick_params(axis='both', colors=text_color) 

    plt.subplot(2, 3, 2)
    plt.imshow(cv2.cvtColor(post_images[index], cv2.COLOR_BGR2RGB))
    plt.title('Post Image', fontweight='bold', fontsize=12, color=text_color)
    plt.tick_params(axis='both', colors=text_color) 

    plt.subplot(2, 3, 3)
    plt.imshow(otsu_thresholds[index][0], cmap='gray')
    plt.title("Otsu's Threshold (Pre Image)", fontweight='bold', fontsize=12, color=text_color)
    plt.tick_params(axis='both', colors=text_color) 

    # Contour detection on the pre-image
    contours, _ = cv2.findContours(otsu_thresholds[index][0], cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    pre_marked = pre_images[index].copy()
    cv2.drawContours(pre_marked, contours, -1, (0, 0, 0), cv2.FILLED)  # Fill damaged regions with black

    plt.subplot(2, 3, 4)
    plt.imshow(cv2.cvtColor(pre_marked, cv2.COLOR_BGR2RGB))
    plt.title('Undamaged Regions (Pre Image)', fontweight='bold', fontsize=12, color=text_color)
    plt.tick_params(axis='both', colors=text_color) 

    plt.subplot(2, 3, 5)
    plt.imshow(otsu_thresholds[index][1], cmap='gray')
    plt.title("Otsu's Threshold (Post Image)", fontweight='bold', fontsize=12, color=text_color)
    plt.tick_params(axis='both', colors=text_color) 

    # Contour detection on the post-image
    contours, _ = cv2.findContours(otsu_thresholds[index][1], cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    post_marked = post_images[index].copy()
    cv2.drawContours(post_marked, contours, -1, (139, 0, 0), 2)  # Dark red for damaged regions

    plt.subplot(2, 3, 6)
    plt.imshow(cv2.cvtColor(post_marked, cv2.COLOR_BGR2RGB))
    plt.title('Damaged Regions (Post Image)', fontweight='bold', fontsize=12, color=text_color)
    plt.tick_params(axis='both', colors=text_color) 

    if canvas is None:
        canvas = FigureCanvasTkAgg(fig, master=root)
        canvas_widget = canvas.get_tk_widget()
        canvas_widget.pack(side=tk.TOP, fill=tk.BOTH, expand=1)
    else:
        canvas.draw()

    current_image_index = index
    calculate_metrics(index)  # Calculate metrics for the displayed image


def next_image():
    global current_image_index
    if current_image_index < len(pre_images) - 1:
        current_image_index += 1
        display_image(current_image_index)

def prev_image():
    global current_image_index
    if current_image_index > 0:
        current_image_index -= 1
        display_image(current_image_index)

def save_images():
    global current_image_index, pre_images, post_images, otsu_thresholds

    if current_image_index < len(pre_images):
        save_dir = filedialog.askdirectory(title="Select a directory to save images")
        if save_dir:
            # Save pre and post images
            cv2.imwrite(os.path.join(save_dir, f"pre_image_{current_image_index}.jpg"), pre_images[current_image_index])
            cv2.imwrite(os.path.join(save_dir, f"post_image_{current_image_index}.jpg"), post_images[current_image_index])

            # Save Otsu's thresholds
            cv2.imwrite(os.path.join(save_dir, f"otsu_pre_{current_image_index}.jpg"), otsu_thresholds[current_image_index][0])
            cv2.imwrite(os.path.join(save_dir, f"otsu_post_{current_image_index}.jpg"), otsu_thresholds[current_image_index][1])

            status_label.configure(text="Images saved successfully")
        else:
            status_label.configure(text="Error: No directory selected")
    else:
        status_label.configure(text="Error: No images to save")

# Create the main window
root = customtkinter.CTk()
root.title("Disaster Assessment Tool")
root.geometry("1200x800")

# Create and pack GUI elements
select_file_button = customtkinter.CTkButton(master=root, text="Select ZIP file", command=extract_and_process)
select_file_button.pack(pady=10)
select_file_button.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

status_label = customtkinter.CTkLabel(root, text="")
status_label.pack()

title_label = customtkinter.CTkLabel(root, text="Disaster Assessment Tool", font=("Helvetica", 35))
title_label.pack(side=tk.TOP, pady=10)

f1_label = customtkinter.CTkLabel(root, text="",font=("Arial", 20) )
f1_label.pack()

metrics_label = customtkinter.CTkLabel(root, text="",font=("Arial", 20))
metrics_label.pack()

next_button = customtkinter.CTkButton(master=root, text="Next", command=next_image)
next_button.pack(pady=10)

prev_button = customtkinter.CTkButton(master=root, text="Previous", command=prev_image)
prev_button.pack(pady=10)

save_button = customtkinter.CTkButton(master=root, text="Save", command=save_images)
save_button.pack(pady=10)

# Run the main loop
root.mainloop()