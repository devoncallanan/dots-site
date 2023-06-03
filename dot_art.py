from PIL import Image, ImageOps
import numpy as np

def build_brushes(brush_img: Image, tile_size=50, num_brushes=3):

    brushes = []

    for i in range(num_brushes):
        icon_size = int(tile_size/(num_brushes + 1) * (i+1))
        # odd tile sizes must have odd icon sizes and vise versa
        icon_size = icon_size if icon_size % 2 == tile_size % 2 else icon_size + 1
        icon = brush_img.resize((icon_size, icon_size))

        brush = ImageOps.expand(icon, border=int((tile_size-icon_size)/2), fill=(255,255,255))
        brushes.append(brush)

    return brushes


def build_dotmap(image: Image, tile_size=50):

    image = ImageOps.pad(image, (4000, 4000))

    image_array = np.asarray(image)
    width, height, color = image_array.shape

    dotmap = np.zeros((int(width/tile_size), int(height/tile_size)))

    for i in range(int(width/tile_size)):
        for j in range(int(height/tile_size)):
            x0 = i*tile_size
            x1 = x0 + tile_size
            y0 = j*tile_size
            y1 = y0 + tile_size
            dotmap[i][j] = np.average(image_array[x0:x1, y0:y1])

    return dotmap

def paint_image(dotmap, brushes):

    # brushes.reverse()
    tile_size = brushes[0].size[0]
    width, height = dotmap.shape

    bins = [int(255/len(brushes)) * i for i in range(len(brushes)-1)]

    brushmap = np.digitize(dotmap, bins)

    final = Image.new('RGBA', (len(dotmap) * tile_size, len(dotmap[0]) * tile_size))

    for i in range(width):
        for j in range(height):
            final.paste(brushes[brushmap[j][i]], (i*tile_size, j*tile_size))

    final.show()


def run(pic: str, brush: str):
    with Image.open(brush) as brush_img:
        with Image.open(pic) as src_img:
            brushes = build_brushes(brush_img, 70, 10)
            dotmap = build_dotmap(src_img, 70)
            paint_image(dotmap, brushes)

run("dcallanan2.jpg", "hank_brush.png")
