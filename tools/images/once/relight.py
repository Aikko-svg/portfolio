# One-off: moved screenshot images from the dark design onto the light background.
# Input: the dark versions of these images (they live on the main branch). Run from the repo root.
# python3 tools/images/once/relight.py utility-warehouse/hero ...   (needs Pillow, numpy, scipy)
import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
P='public/images/'
BG=(232,234,237)
HULL={'hastings-direct/s1-before'}
for name in sys.argv[1:]:
    im=Image.open(P+name+'@2x.jpg').convert('RGB'); a=np.asarray(im).astype(int)
    bg=a[3,3]; d=np.abs(a-bg).max(axis=2)
    near=d<=12
    lab,n=ndimage.label(near)
    edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    bgmask=np.isin(lab,list(edge))
    fg=~bgmask
    fg=ndimage.binary_fill_holes(fg)
    if name in HULL:
        from scipy.spatial import ConvexHull
        from PIL import ImageDraw
        fl,k=ndimage.label(fg); m=Image.new('L',im.size,0); dr=ImageDraw.Draw(m)
        for i,sl in enumerate(ndimage.find_objects(fl),1):
            ys,xs=np.nonzero(fl[sl]==i)
            if len(xs)<5000: continue
            pts=np.c_[xs+sl[1].start,ys+sl[0].start]; h=ConvexHull(pts)
            dr.polygon([tuple(p) for p in pts[h.vertices]],fill=255)
        fg=np.asarray(m)>0
    fg=ndimage.binary_erosion(fg,iterations=3)
    alpha=Image.fromarray((fg*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8))
    out=Image.new('RGB',im.size,BG)
    sh=alpha.filter(ImageFilter.GaussianBlur(40)).point(lambda v:int(v*0.22))
    shadow=Image.new('RGB',im.size,(22,24,29))
    off=Image.new('L',im.size,0); off.paste(sh,(0,24))
    out.paste(shadow,(0,0),off)
    ring=alpha.filter(ImageFilter.MaxFilter(3))
    out.paste(Image.new('RGB',im.size,(205,209,214)),(0,0),ring)
    out.paste(im,(0,0),alpha)
    out.save(P+name+'@2x.relit.png')
    print(name, n)
