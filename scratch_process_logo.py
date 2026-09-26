import os
from PIL import Image, ImageFilter, ImageOps, ImageEnhance
import numpy as np

src_path = r"C:\Users\Win11\.gemini\antigravity-ide\brain\cd724a0d-a79f-4755-8393-f7180e1346d2\.user_uploaded\media_1790431695036.png"
out_dir = r"c:\Users\Win11\Desktop\caffyo\assets\brand"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert("RGBA")
w, h = img.size
print(f"Loaded image size: {w}x{h}")

# Save untouched backup
img.save(os.path.join(out_dir, "zauq_raw.png"))

# Let's upscale with high quality Lanczos (4x)
scale = 4
up_w, up_h = w * scale, h * scale
upscaled = img.resize((up_w, up_h), Image.Resampling.LANCZOS)

# Convert to numpy array for precise color keying
arr = np.array(upscaled, dtype=float)

# Background color sampling from corners
bg_sample = (arr[:20, :20, :3] + arr[-20:, :20, :3] + arr[:20, -20:, :3] + arr[-20:, -20:, :3]) / 4.0
bg_color = np.median(bg_sample.reshape(-1, 3), axis=0)
print(f"Detected background color (RGB): {bg_color}")

# Distance from background color
rgb = arr[:, :, :3]
diff = np.linalg.norm(rgb - bg_color, axis=2)

# Also calculate perceived brightness of foreground gold
# Gold lines have higher red and green than blue and much higher than dark bg
lum = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]
bg_lum = 0.299 * bg_color[0] + 0.587 * bg_color[1] + 0.114 * bg_color[2]
lum_diff = np.maximum(0, lum - bg_lum)

# Build a smooth alpha mask
# Thresholds
low_t = 18.0
high_t = 65.0
alpha_raw = np.clip((lum_diff - low_t) / (high_t - low_t), 0.0, 1.0)

# Create an alpha-transparent version with pure luxury gold palette
# Let's preserve the original gold tones but normalize them to luxury warm gold #d4af37 / #e6ca65
gold_arr = np.zeros((up_h, up_w, 4), dtype=np.uint8)

# Normalized color: warm champagne gold #dfc99c to #c6a767
# Let's use the actual hue from original image, brightening where it was anti-aliased
for c in range(3):
    gold_arr[:, :, c] = np.clip(rgb[:, :, c] * 1.15, 0, 255).astype(np.uint8)

gold_arr[:, :, 3] = (alpha_raw * 255).astype(np.uint8)

gold_img = Image.fromarray(gold_arr, mode="RGBA")

# Also create a crisp trimmed version
bbox = gold_img.split()[-1].getbbox()
print(f"Alpha Bounding Box: {bbox}")
if bbox:
    cropped_gold = gold_img.crop(bbox)
    # Add a generous 10% breathing padding
    pad = 30
    final_w, final_h = cropped_gold.width + pad * 2, cropped_gold.height + pad * 2
    padded_gold = Image.new("RGBA", (final_w, final_h), (0, 0, 0, 0))
    padded_gold.paste(cropped_gold, (pad, pad))
    padded_gold.save(os.path.join(out_dir, "caffyo_zauq_logo_gold.png"), "PNG")
    print(f"Saved caffyo_zauq_logo_gold.png ({final_w}x{final_h})")

    # Also create a pure gold gradient / solid luxury edition
    # Where alpha > 0, tinted with exact metallic champagne gold #e5c583
    tinted_arr = np.zeros((final_h, final_w, 4), dtype=np.uint8)
    crop_arr = np.array(padded_gold)
    a_chan = crop_arr[:, :, 3].astype(float) / 255.0
    
    # Gradient from top #f0d99f to bottom #c9a456
    y_coords = np.linspace(0, 1, final_h)[:, None]
    top_color = np.array([240, 217, 159]) # #f0d99f
    bot_color = np.array([201, 164, 86])  # #c9a456
    grad = (1 - y_coords) * top_color + y_coords * bot_color  # shape (final_h, 3)
    
    for c in range(3):
        col_slice = np.repeat(grad[:, c:c+1], final_w, axis=1)
        tinted_arr[:, :, c] = np.clip(col_slice, 0, 255).astype(np.uint8)
    tinted_arr[:, :, 3] = (a_chan * 255).astype(np.uint8)
    
    tinted_img = Image.fromarray(tinted_arr, mode="RGBA")
    tinted_img.save(os.path.join(out_dir, "caffyo_zauq_logo_champagne.png"), "PNG")
    print("Saved caffyo_zauq_logo_champagne.png")

    # Also create a high-contrast white edition for dark backgrounds
    white_arr = np.zeros((final_h, final_w, 4), dtype=np.uint8)
    white_arr[:, :, 0] = 245
    white_arr[:, :, 1] = 240
    white_arr[:, :, 2] = 232
    white_arr[:, :, 3] = (a_chan * 255).astype(np.uint8)
    white_img = Image.fromarray(white_arr, mode="RGBA")
    white_img.save(os.path.join(out_dir, "caffyo_zauq_logo_white.png"), "PNG")
    print("Saved caffyo_zauq_logo_white.png")

    # Also create the original badge style with the deep forest green rounded card
    badge = Image.new("RGBA", (final_w + 60, final_h + 60), (0, 0, 0, 0))
    from PIL import ImageDraw
    draw = ImageDraw.Draw(badge)
    # Draw luxury dark green rounded rectangle #1a2a1f with subtle gold border
    draw.rounded_rectangle([0, 0, final_w + 59, final_h + 59], radius=24, fill=(26, 42, 31, 255), outline=(197, 160, 89, 120), width=2)
    badge.paste(tinted_img, (30, 30), tinted_img)
    badge.save(os.path.join(out_dir, "caffyo_zauq_badge_darkgreen.png"), "PNG")
    print("Saved caffyo_zauq_badge_darkgreen.png")
