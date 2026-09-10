const MOUNTAIN_COLOR = "#8a8170";
const MOUNTAIN_DARK = "#6f6755";
const FOREST_COLOR = "#7d9a6a";
const FOREST_DARK = "#5d7c4e";
const WATER_DARK = "#7fa6c9";
const LAND_COLOR = "#e8dcc0";
const LAND_BORDER = "#6b5b3e";
const MORDOR_COLOR = "#d9c4a0";
const MORDOR_BORDER = "#4d3f2c";

type Triangle = [number, number, number, number, number, number];

function MountainRange({ triangles, dark }: { triangles: Triangle[]; dark: boolean }) {
  return (
    <g
      fill={dark ? MOUNTAIN_DARK : MOUNTAIN_COLOR}
      stroke={LAND_BORDER}
      strokeWidth={2}
      shapeRendering="crispEdges"
    >
      {triangles.map(([x1, y1, x2, y2, x3, y3], i) => (
        <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} />
      ))}
    </g>
  );
}

function Forest({ points, dark }: { points: string; dark: boolean }) {
  return (
    <polygon
      points={points}
      fill={dark ? FOREST_DARK : FOREST_COLOR}
      stroke={LAND_BORDER}
      strokeWidth={2}
      shapeRendering="crispEdges"
    />
  );
}

export default function MapBackground() {
  return (
    <g>
      <rect x={0} y={0} width={1200} height={900} fill={LAND_COLOR} />

      <path
        d="M -20 900 L -20 160 L 70 160 Q 100 210 86 260 L 74 315 Q 120 330 150 380 L 196 460 Q 178 520 208 580 L 320 690 Q 415 800 520 850 L 520 900 Z"
        fill="#9dc0dd"
        stroke={WATER_DARK}
        strokeWidth={2}
        shapeRendering="crispEdges"
      />

      <path
        d="M 820 900 L 820 780 L 856 742 L 880 690 L 1000 672 L 1110 672 L 1110 900 Z"
        fill={MORDOR_COLOR}
        stroke={MORDOR_BORDER}
        strokeWidth={2}
        shapeRendering="crispEdges"
      />

      <path
        d="M 700 40 C 724 120 692 200 708 260 C 730 330 740 380 745 430 C 760 480 792 540 795 605 C 798 645 797 685 804 725 C 814 780 856 820 890 852 L 900 900"
        fill="none"
        stroke={WATER_DARK}
        strokeWidth={10}
        strokeLinecap="square"
        shapeRendering="crispEdges"
      />

      <path
        d="M 330 120 C 306 200 282 280 302 360 C 324 445 356 505 386 580 L 398 620"
        fill="none"
        stroke={WATER_DARK}
        strokeWidth={5}
        strokeLinecap="square"
        shapeRendering="crispEdges"
      />

      <MountainRange
        triangles={[
          [80, 150, 96, 118, 118, 150],
          [92, 190, 112, 156, 134, 190],
          [110, 235, 126, 205, 148, 235],
          [126, 285, 146, 260, 166, 285],
          [152, 340, 172, 316, 194, 340],
          [176, 400, 198, 374, 220, 400],
        ]}
        dark={false}
      />

      <MountainRange
        triangles={[
          [620, 100, 642, 66, 668, 100],
          [656, 92, 680, 56, 704, 92],
          [694, 98, 716, 66, 740, 98],
        ]}
        dark={false}
      />

      <MountainRange
        triangles={[
          [500, 160, 520, 118, 546, 160],
          [526, 196, 552, 148, 578, 196],
          [548, 238, 576, 188, 602, 238],
          [560, 288, 590, 240, 616, 288],
          [576, 340, 602, 296, 634, 340],
          [566, 400, 600, 350, 632, 400],
          [560, 458, 588, 414, 618, 458],
        ]}
        dark={true}
      />

      <MountainRange
        triangles={[
          [856, 742, 872, 700, 898, 742],
          [884, 792, 902, 748, 930, 792],
          [906, 842, 928, 796, 956, 842],
          [932, 890, 954, 844, 982, 890],
          [986, 880, 1010, 838, 1040, 880],
        ]}
        dark={true}
      />

      <MountainRange
        triangles={[
          [888, 690, 916, 654, 944, 690],
          [936, 698, 962, 664, 990, 698],
          [986, 700, 1012, 666, 1040, 700],
        ]}
        dark={false}
      />

      <MountainRange
        triangles={[
          [560, 792, 586, 760, 614, 792],
          [602, 806, 626, 776, 654, 806],
          [650, 812, 676, 782, 702, 812],
        ]}
        dark={false}
      />

      <Forest points="378,170 452,158 448,262 390,284" dark={false} />
      <Forest points="392,206 430,194 434,240 400,252" dark={false} />
      <Forest points="640,512 716,498 728,574 648,588" dark={false} />
      <Forest points="900,120 1080,132 1064,424 916,408 872,300" dark={true} />
      <Forest points="836,700 908,688 920,760 848,786" dark={false} />
    </g>
  );
}