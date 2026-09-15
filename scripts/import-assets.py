"""Reconstruct private local assets from the user's original archive. No network or upload."""
from argparse import ArgumentParser
from pathlib import Path
from zipfile import ZipFile
from io import BytesIO
from PIL import Image

parser = ArgumentParser(description=__doc__)
parser.add_argument('archive', type=Path, help='Path to grafiki-fundacja-lepszy-dom.zip')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
files = {
    'grupa': 'galeria/galeria-16.jpg', 'edukacja': 'galeria/galeria-20.jpg',
    'listy': 'galeria/galeria-19.jpg',
    'polish-airports-academy': 'partnerzy/polish-airports-academy.png',
    'elektrohome': 'partnerzy/elektrohome.png', 'foldruk-folion': 'partnerzy/foldruk-folion.png',
    'milo-kosmetyka': 'partnerzy/milo-kosmetyka.jpg', 'zedra': 'partnerzy/zedra.png',
}
output = root / 'assets/premium'
output.mkdir(parents=True, exist_ok=True)
with ZipFile(args.archive) as archive:
    for name, source in files.items():
        with Image.open(BytesIO(archive.read('grafiki-fundacja/' + source))) as image:
            image.thumbnail((1000, 1000))
            destination = output / (name + '.webp')
            image.save(destination, quality=90, method=6)
        with Image.open(destination) as check:
            check.load()
(root / 'assets/akcja-fundacji-grupa.webp').write_bytes((output / 'grupa.webp').read_bytes())
print('Prepared 8 local assets and restored the archive photograph. No files uploaded.')
