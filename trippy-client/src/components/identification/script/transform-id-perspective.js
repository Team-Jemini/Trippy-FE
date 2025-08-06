// 왜곡된 사각형을 정렬해서 바로 보는 이미지로 바꿈
export function getPerspectiveCorrectedImage(src, approx, width, height) {
  const pts = [];
  for (let i = 0; i < 4; i++) {
    const x = approx.intPtr(i, 0)[0];
    const y = approx.intPtr(i, 0)[1];
    pts.push({ x, y });
  }

  pts.sort((a, b) => a.x + a.y - (b.x + b.y));
  const [tl, br] = [pts[0], pts[3]];
  const [tr, bl] = pts[1].x > pts[2].x ? [pts[1], pts[2]] : [pts[2], pts[1]];

  const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
    tl.x,
    tl.y,
    tr.x,
    tr.y,
    br.x,
    br.y,
    bl.x,
    bl.y,
  ]);

  const dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, width, 0, width, height, 0, height]);

  const M = cv.getPerspectiveTransform(srcTri, dstTri);
  const dst = new cv.Mat();
  cv.warpPerspective(src, dst, M, new cv.Size(width, height));

  srcTri.delete();
  dstTri.delete();
  M.delete();

  return dst;
}
