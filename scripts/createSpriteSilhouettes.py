"""Regenerate code-native silhouette clips: python3 scripts/createSpriteSilhouettes.py.
Requires Pillow. Reads source PNGs without modifying them; only writes TS metadata.
"""
from PIL import Image
from pathlib import Path
import json
from math import hypot

def simplify(points, tolerance=1.5):
 if len(points)<3:return points
 a,b=points[0],points[-1];dx=b[0]-a[0];dy=b[1]-a[1];length=hypot(dx,dy)
 distances=[abs(dy*(x-a[0])-dx*(y-a[1]))/length if length else hypot(x-a[0],y-a[1]) for x,y in points[1:-1]]
 distance=max(distances);index=distances.index(distance)+1
 return simplify(points[:index+1])[:-1]+simplify(points[index:]) if distance>tolerance else [a,b]

result={}
for skin in ['sparky','cat','astro','prof'] + [p.stem for p in Path('public/avatar/street').glob('*.png')]:
 result[skin]={}
 for kind in (['idle','movement'] if skin in ['sparky','cat','astro','prof'] else ['idle']):
  image=Image.open(f"public/avatar/{'mentors' if skin in ['sparky','cat','astro','prof'] else 'street'}/{skin}"+('-movements-v2' if kind=='movement' else '')+'.png').getchannel('A')
  w=image.width//6;h=image.height//(2 if kind=='movement' else 1); paths=[]
  for row in range(2 if kind=='movement' else 1):
   for col in range(6):
    values=list(image.crop((col*w,row*h,(col+1)*w,(row+1)*h)).getdata()); seen=bytearray(w*h);largest=[]
    for i,a in enumerate(values):
     if a<100 or seen[i]:continue
     stack=[i];seen[i]=1;part=[]
     while stack:
      n=stack.pop();part.append(n);x=n%w;y=n//w
      for m in ([n-1] if x else [])+([n+1] if x<w-1 else [])+([n-w] if y else [])+([n+w] if y<h-1 else []):
       if not seen[m] and values[m]>=100:seen[m]=1;stack.append(m)
     if len(part)>len(largest):largest=part
    # Expand the principal silhouette by two pixels to retain anti-aliased edges.
    rows={}
    for n in largest:
     x=n%w;y=n//w
     for yy in range(max(0,y-2),min(h,y+3)):
      rows.setdefault(yy,set()).update(range(max(0,x-2),min(w,x+3)))
    edges={}
    def edge(a,b):edges.setdefault(a,[]).append(b)
    for y,xs in rows.items():
     above=rows.get(y-1,set());below=rows.get(y+1,set())
     for x in xs:
      if x not in above:edge((x,y),(x+1,y))
      if x+1 not in xs:edge((x+1,y),(x+1,y+1))
      if x not in below:edge((x+1,y+1),(x,y+1))
      if x-1 not in xs:edge((x,y+1),(x,y))
    commands=[]
    while edges:
     start=next(iter(edges));point=start;contour=[start]
     while True:
      next_point=edges[point].pop()
      if not edges[point]:del edges[point]
      contour.append(next_point);point=next_point
      if point==start:break
     area=abs(sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(contour,contour[1:]))) / 2
     if area<12:continue
     polygon=simplify(contour)
     commands.append('M'+'L'.join(f'{x} {y}' for x,y in polygon[:-1])+'z')
    paths.append(''.join(commands))
  result[skin][kind]={'width':w,'height':h,'paths':paths}
Path('components/spriteSilhouettes.ts').write_text('// Principal-silhouette clipping paths exclude adjacent frame fragments without changing source art.\nexport const SPRITE_SILHOUETTES = '+json.dumps(result,separators=(',',':'))+' as const;\n')
