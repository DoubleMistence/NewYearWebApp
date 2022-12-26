import cv2
import numpy as np
import os

read_dir = './source'
output_dir = '../app/static/img/'
c = 0
size = (1280,720)
file = [[],[],[],[]]

l = os.listdir(output_dir)
l_img_num = len([s for s in l if s.startswith('img')])
for i in range(l_img_num):
    os.remove(output_dir + 'img' + str(i + 1) + '.PNG')

for file_name in os.listdir(read_dir):
    file_path = os.path.join(read_dir,file_name)
    file[0].append(file_path)
    if os.path.isfile(file_path):
        c += 1

for i in range(c):
    file[2].append(cv2.imread(file[0][i]))
    file[2][i] = cv2.resize(file[2][i], size)
    file[1].append(file[2][i][360:720, 0:1280])
    file[3].append(file[2][i][0:360, 0:1280])

for i in range(c):
    im_v = cv2.vconcat([file[2][(i+2)%c], file[2][(i+1)%c], file[2][i%c]])
    cv2.imwrite(output_dir + 'img' + str(2 * i + 1) + '.PNG', im_v)
    im_v = cv2.vconcat([file[1][(i+3)%c], file[2][(i+2)%c], file[2][(i+1)%c], file[3][i%c]])
    cv2.imwrite(output_dir + 'img' + str(2 * i + 2) + '.PNG', im_v)