const devicesBrands = [
    {
      brand: "Apple",
      devices: [
        {
          name: "iPhone 13 Pro",
          displayName: "Apple iPhone 13 Pro",
          views: {
            front:{x: 0, y: 0, z: 0},
            back:{x:0, y:Math.PI, z:0},
            sim:{x:0, y:Math.PI/-2, z:0},
            charge:{x:Math.PI/2, y:0, z:0}
          },
          unbox: "../models/iPhone13Pro/iPhone13_Unboxing_03.glb",
          variant: [
            {
              color: "#9aafca",
              image: require("../assets/devices/iPhone13Pro/iPhone13Pro_Blue.png"),
              model: "../models/iPhone13Pro/iPhone13Pro_blue.glb",
              webLink: "https://www.apple.com/in/iphone/",
              qrLink: "../../assets/devices/iPhone13Pro/qr.png",
              active: true,
            },
            {
              color: "#f5e1c8",
              image: require("../assets/devices/iPhone13Pro/iPhone13Pro_Gold.png"),
              model: "../models/iPhone13Pro/iPhone13Pro_gold.glb",
              webLink: "https://www.apple.com/in/iphone/",
              qrLink: "../../assets/devices/iPhone13Pro/qr.png",
            },
            {
              color: "#4c4a46",
              image: require("../assets/devices/iPhone13Pro/iPhone13Pro_Graphite.png"),
              model: "../models/iPhone13Pro/iPhone13Pro_graphite.glb",
              webLink: "https://www.apple.com/in/iphone/",
              qrLink: "../../assets/devices/iPhone13Pro/qr.png",
            },
          ],
        },
        // {
        //   name: "iPhone 12 Pro",
        //   displayName: "Apple iPhone 12 Pro",
        // views: {
        //   front:{x: 0, y: 0, z: 0},
        //   back:{x:0, y:Math.PI, z:0},
        //   sim:{x:0, y:Math.PI/-2, z:0},
        //   charge:{x:Math.PI/2, y:0, z:0}
        // },
        //   variant: [
        //     {
        //       color: "#F6E0C9",
        //       image: "../../assets/devices/iPhone12Pro/iphone-12-pro-gold.png",
        //       model: "../../assets/devices/iPhone12Pro/iPhone12Pro_Gold.glb",
        //       webLink: "https://www.apple.com/in/iphone/",
        //       qrLink: "../../assets/devices/iPhone12Pro/qr.png",
        //       active: true,
        //     },
        //     {
        //       color: "#383428",
        //       image: "../../assets/devices/iPhone12Pro/iphone-12-pro-graphite.png",
        //       model: "../../assets/devices/iPhone12Pro/iPhone12Pro_Graphite.glb",
        //       webLink: "https://www.apple.com/in/iphone/",
        //       qrLink: "../../assets/devices/iPhone12Pro/qr.png",
        //     },
        //     {
        //       color: "#D8D7CB",
        //       image: "../../assets/devices/iPhone12Pro/iphone-12-pro-silver.png",
        //       model: "../../assets/devices/iPhone12Pro/iPhone12Pro_Silver.glb",
        //       webLink: "https://www.apple.com/in/iphone/",
        //       qrLink: "../../assets/devices/iPhone12Pro/qr.png",
        //     },
        //   ],
        // },
      ],
    },
    {
      brand: "Samsung",
      devices: [
        {
          name: "Galaxy Z Flip3",
          displayName: "Samsung Galaxy Z Flip3",
          views: {
            front:{x: 0, y: 0, z: 0},
            back:{x:0, y:Math.PI, z:0},
            sim:{x:0, y:Math.PI/-2, z:0},
            charge:{x:Math.PI/2, y:0, z:0}
          },
          variant: [
            {
              color: "black",
              image: require("../assets/devices/samsungZFlip3/Zflip3_Black.png"),
              model: "../models/samsungZFlip3/Zflip3_Black_Animated.glb",
              webLink: "https://www.samsung.com/in/smartphones/galaxy-z-flip/",
              qrLink: "../models/samsungZFlip3/qr.png",
              active: true,
            },
            {
              color: "#f7f4d3",
              image: require("../assets/devices/samsungZFlip3/Zflip3_Cream.png"),
              model: "../models/samsungZFlip3/Zflip3_Cream_Animated.glb",
              webLink: "https://www.samsung.com/in/smartphones/galaxy-z-flip/",
              qrLink: "../models/samsungZFlip3/qr.png"
            },
            {
              color: "#57666a",
              image: require("../assets/devices/samsungZFlip3/Zflip3_Green.png"),
              model: "../models/samsungZFlip3/Zflip3_Green_Animated.glb",
              webLink: "https://www.samsung.com/in/smartphones/galaxy-z-flip/",
              qrLink: "../models/samsungZFlip3/qr.png"
            },
            {
              color: "#c2b1d7",
              image: require("../assets/devices/samsungZFlip3/Zflip3_Lavender.png"),
              model: "../models/samsungZFlip3/Zflip3_Lavender_Animated.glb",
              webLink: "https://www.samsung.com/in/smartphones/galaxy-z-flip/",
              qrLink: "../models/samsungZFlip3/qr.png"
            },
          ],
        },
      ],
    },
    {
      brand: "Google",
      devices: [
        {
          name: "Pixel 6 Pro",
          displayName: "Google Pixel 6 Pro",
          views: {
            front:{x: 0, y: 0, z: 0},
            back:{x:0, y:Math.PI, z:0},
            sim:{x:0, y:Math.PI/-2, z:0},
            charge:{x:Math.PI/2, y:0, z:0}
          },
          variant: [
            {
              color: "#343538",
              image: require("../assets/devices/pixel6Pro/pixel6Pro_StormyBlack.png"),
              model: "../models/pixel6Pro/pixel6Pro_StormyBlack.glb",
              webLink: "https://www.samsung.com/us/smartphones/galaxy-a42-5g/",
              qrLink: "../models/pixel6Pro/qr.png",
              active: true,
            },
            {
              color: "#e9e4e0",
              image: require("../assets/devices/pixel6Pro/pixel6Pro_CloudyWhite.png"),
              model: "../models/pixel6Pro/pixel6Pro_CloudyWhite.glb",
              webLink: "https://www.samsung.com/us/smartphones/galaxy-a42-5g/",
              qrLink: "../models/pixel6Pro/qr.png"
            },
            {
              color: "#fbf2d1",
              image: require("../assets/devices/pixel6Pro/pixel6Pro_SortaSunny.png"),
              model: "../models/pixel6Pro/pixel6Pro_SortaSunny.glb",
              webLink: "https://www.samsung.com/us/smartphones/galaxy-a42-5g/",
              qrLink: "../models/pixel6Pro/qr.png"
            },
          ],
        },
      ],
    },
  ];


export default devicesBrands;
