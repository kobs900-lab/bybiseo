import sys
sys.path.insert(0,'/Users/bs/.local/share/uv/tools/phone-harness/lib/python3.12/site-packages')
from phone_harness.ocr import recognize, image_size
for p in sys.argv[1:]:
    w,h=image_size(p); r=recognize(p,{'x':0,'y':0,'w':w,'h':h})
    r.sort(key=lambda o:(round(o['y']/(h*0.008)),o['x']))
    print('=====',p,w,h)
    rows=[];
    for o in r:
        yp=o['y']/h*100
        if rows and abs(rows[-1][0]-yp)<0.9: rows[-1][1].append(o['text'])
        else: rows.append([yp,[o['text']]])
    for yp,t in rows: print(f"{yp:5.1f}% | "+' · '.join(t)[:110])
