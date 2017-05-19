var config = {
    basic: {
        js    : [
            // {name: "vivus", url: "vivus.js", sync: false},
            {name: "sound", url: "game/Sound.js", sync: false},
            {name:"game",url:"game/gameLayer.js", sync: false},
            {name:"handle",url:"game/handle.js", sync: false}


        ],
        images: [
            "img/page_7_046.png",
            "img/music_on.png",
            "img/music_off.png"

        ],
        video : [],
        res   : [

            {url: "res/Gome3.svg", type: 'svg'},
            {url: "res/Gome4.svg", type: 'svg'},
            {url: "res/Gome5.svg", type: 'svg'},
            {url: "res/Gome6.svg", type: 'svg'},
            {url: "res/Gome7.svg", type: 'svg'},
            {url: "res/Gome8.svg", type: 'svg'},
            {url: "res/Gome9.svg", type: 'svg'},



        ]

    },
    pages: [


        {
            id:"page_4",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"img/page_4_080.png",rect:{x:49,y:102.5,w:222.5,h:61.5},comment:"WHO_IS_GOMEPLUS",time:"",wait:"",class:"fadeIn"},
                {type:"img",src:"img/page_4_081.png",rect:{x:117,y:452,w:84.5,h:11},comment:"Touch&Know",time:"",wait:"",class:"fadeIn"},
                {type:"img",src:"img/page_4_082.png",rect:{x:147,y:402,w:24.5,h:36},comment:"编组",time:"1000",wait:"",animates:"scale",count:"infinite"},
                {type:"img",src:"img/page_4_083.png",rect:{x:25,y:204.5,w:73.5,h:75.5},comment:"编组",time:"",wait:"",class:"start_button"},

            ]
        },
        {
            id:"page_5",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"img/page_5_077.png",rect:{x:81.5,y:298,w:213.5,h:68},comment:"SOCIAL_&SHOPPING",time:"",wait:"3000",animates:"slideInRight",class:"p5_slideInRight"},
                {type:"img",src:"img/page_5_078.png",rect:{x:174,y:392,w:117,h:46},comment:"GUIDE_PLATFORM",time:"",wait:"4200",animates:"slideInRight",class:"p5_slideInRight2"},

                {type:"div",id:"hand1",pos:"absolute",background:"",rect:{x:147,y:460,w:52.5,h:28.5},comment:"编组",time:"100",wait:"4400",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/left_hand.png",rect:{x:0,y:0,w:52.5,h:28.5},comment:"left_hand",time:"1000",wait:"",class:"",animates:"shakeTopBottom",count:"infinite"},
                        {type:"img",src:"img/top.png",rect:{x:1,y:20,w:15,h:14},comment:"编组",time:"1000",wait:"",animates:"shakeTop",count:"infinite"}

                    ]
                }
            ]
        },
        {
            id:"page_6",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"img/page_6_064.png",rect:{x:32,y:45.5,w:238,h:63.5},comment:"About_GOME_Holdings_Group",time:"",wait:"",animates:"fadeIn"},
                {type:"img",src:"img/page_6_065.png",rect:{x:59.5,y:153,w:21.5,h:7},comment:"1987",time:"300",wait:"1700",animates:"fadeIn",class:"ele_87"},
                {type:"img",src:"img/page_6_066.png",rect:{x:125.5,y:153,w:21.5,h:7},comment:"1989",time:"300",wait:"2600",animates:"fadeIn",class:"ele_89"},
                {type:"img",src:"img/page_6_067.png",rect:{x:179,y:183,w:22.5,h:7},comment:"2004",time:"300",wait:"3100",animates:"fadeIn",class:"ele_04"},
                {type:"img",src:"img/page_6_068.png",rect:{x:234.5,y:163,w:22,h:7},comment:"2005",time:"300",wait:"3500",animates:"fadeIn",class:"ele_05"},
                {type:"img",src:"img/page_6_069.png",rect:{x:226.5,y:242,w:22.5,h:7},comment:"2008",time:"300",wait:"4500",animates:"fadeIn",class:"ele_08"},
                {type:"img",src:"img/page_6_070.png",rect:{x:137,y:233,w:21,h:7},comment:"2011",time:"300",wait:"5000",animates:"fadeIn",class:"ele_11"},
                {type:"img",src:"img/page_6_071.png",rect:{x:53.5,y:223,w:22,h:7},comment:"2013",time:"300",wait:"5800",animates:"fadeIn",class:"ele_13"},
                {type:"img",src:"img/page_6_072.png",rect:{x:220.5,y:373.5,w:22,h:7},comment:"2017",time:"300",wait:"9400",animates:"fadeIn",class:"ele_17"},
                {type:"img",src:"img/page_6_073.png",rect:{x:130.5,y:314.5,w:22,h:7},comment:"2016",time:"300",wait:"8800",animates:"fadeIn",class:"ele_16"},
                {type:"img",src:"img/page_6_074.png",rect:{x:48.5,y:333.5,w:22,h:7},comment:"2015",time:"300",wait:"7000",animates:"fadeIn",class:"ele_15"},
                {type:"img",src:"img/page_6_075.png",rect:{x:176,y:125.5,w:108,h:11.5},comment:"Click_to_view",time:"400",wait:"300",animates:"blink",count:"infinite"},

                {type:"img",src:"img/page_2_104.png",rect:{x:50.5,y:177,w:219,h:60},comment:"98",time:"",wait:"",class:"show_87"},
                {type:"img",src:"img/page_2_105.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"98",time:"",wait:"",class:"show_87 close"},
                {type:"img",src:"img/page_2_106.png",rect:{x:50.5,y:177,w:219,h:60},comment:"99",time:"",wait:"",class:"show_89"},
                {type:"img",src:"img/page_2_107.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"99",time:"",wait:"",class:"show_89 close"},
                {type:"img",src:"img/page_2_108.png",rect:{x:50.5,y:177,w:219,h:84},comment:"04.-Yu_become__the_richest_man_in_China.",time:"",wait:"",class:"show_04"},
                {type:"img",src:"img/page_2_109.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"04",time:"",wait:"",class:"show_04 close"},
                {type:"img",src:"img/page_2_110.png",rect:{x:50.5,y:177,w:219,h:60},comment:"路径+05",time:"",wait:"",class:"show_05"},
                {type:"img",src:"img/page_2_111.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"05",time:"",wait:"",class:"show_05 close"},
                {type:"img",src:"img/page_2_114.png",rect:{x:50.5,y:177,w:219,h:60},comment:"2008",time:"",wait:"",class:"show_08"},
                {type:"img",src:"img/page_2_115.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"2008",time:"",wait:"",class:"show_08 close"},
                {type:"img",src:"img/page_2_112.png",rect:{x:50.5,y:177,w:219,h:68},comment:"2011",time:"",wait:"",class:"show_11"},
                {type:"img",src:"img/page_2_113.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"2011",time:"",wait:"",class:"show_11 close"},
                {type:"img",src:"img/page_1_117.png",rect:{x:50.5,y:177,w:219,h:66},comment:"13",time:"",wait:"",class:"show_13"},
                {type:"img",src:"img/page_1_118.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"13",time:"",wait:"",class:"show_13 close"},
                {type:"img",src:"img/page_1_119.png",rect:{x:50.5,y:177,w:219,h:72},comment:"2015",time:"",wait:"",class:"show_15"},
                {type:"img",src:"img/page_1_120.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"15",time:"",wait:"",class:"show_15 close"},
                {type:"img",src:"img/page_1_121.png",rect:{x:50.5,y:177,w:219,h:59.5},comment:"2016",time:"",wait:"",class:"show_16"},
                {type:"img",src:"img/page_1_122.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"16",time:"",wait:"",class:"show_16 close"},
                {type:"img",src:"img/page_1_123.png",rect:{x:50.5,y:177,w:219,h:75},comment:"2017",time:"",wait:"",class:"show_17"},
                {type:"img",src:"img/page_1_124.png",rect:{x:238.5,y:172,w:12.5,h:12.5},comment:"2017",time:"",wait:"",class:"show_17 close"},

                {type:"div",id:"hand2",pos:"absolute",background:"",rect:{x:137,y:460,w:33.5,h:28.5},comment:"编组",time:"100",wait:"9100",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/right_hand.png",rect:{x:0,y:0,w:33.5,h:28.5},comment:"right",time:"1000",wait:"",class:"",animates:"shakeTopBottom2",count:"infinite"},
                        {type:"img",src:"img/top.png",rect:{x:18,y:20,w:15,h:14},comment:"编组",time:"1000",wait:"",animates:"shakeTop",count:"infinite"}

                    ]
                }


            ]
        },
        {
            id:"page_7",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"img/page_7_037.png",rect:{x:12,y:260,w:53.5,h:8},comment:"Real_Estate",time:"500",wait:"2100",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_038.png",rect:{x:190.5,y:307.5,w:36.5,h:7.5},comment:"Finance",time:"500",wait:"2100",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_039.png",rect:{x:74.5,y:84.5,w:26.5,h:8},comment:"Retail",time:"500",wait:"1800",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_040.png",rect:{x:16.5,y:130.5,w:39.5,h:7.5},comment:"Internet",time:"500",wait:"1800",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_041.png",rect:{x:247,y:67.5,w:49,h:20},comment:"Intelligent_Home",time:"500",wait:"1900",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_042.png",rect:{x:232.5,y:214.5,w:62,h:8},comment:"Smart_Phone",time:"500",wait:"2000",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_043.png",rect:{x:139,y:166,w:61,h:31.5},comment:"Business_segments",time:"500",wait:"1500",animates:"fadeIn",class:""},
                {type:"div",id:"rotate",pos:"absolute",background:"",rect:{x:36,y:85,w:250.5,h:206},comment:"编组",time:"",wait:"",animates:"",class:"",
                    dom:[
                        {type:"img",src:"img/page_7_046.png",rect:{x:0,y:0,w:250.5,h:206},comment:"编组",time:"",wait:"",animates:"",class:""},
                        {type:"img",src:"img/page_7_047.png",rect:{x:54.5,y:155.5,w:51.5,h:44.5},comment:"编组",time:"",wait:"",animates:"",class:"rotateIn2"},
                        {type:"img",src:"img/page_7_048.png",rect:{x:166.5,y:182,w:44,h:36},comment:"编组",time:"",wait:"",animates:"",class:"rotateIn2"},
                        {type:"img",src:"img/page_7_049.png",rect:{x:83,y:-17,w:44.5,h:32},comment:"编组",time:"",wait:"",animates:"",class:"rotateIn2"},
                        {type:"img",src:"img/page_7_050.png",rect:{x:221,y:90.5,w:34,h:36},comment:"编组",time:"",wait:"",animates:"",class:"rotateIn2"},
                        {type:"img",src:"img/page_7_051.png",rect:{x:183.5,y:7,w:39.5,h:34},comment:"编组",time:"",wait:"",animates:"",class:"rotateIn2"},
                        {type:"img",src:"img/page_7_052.png",rect:{x:25,y:69,w:35,h:35},comment:"编组",time:"",wait:"",animates:"",class:"rotateIn2"},

                    ]
                },
                {type:"img",src:"img/page_7_053.png",rect:{x:172.5,y:429,w:70,h:10.5},comment:"图层_17",time:"500",wait:"5000",animates:"fadeIn",class:""},

                {type:"img",src:"img/page_7_044.png",rect:{x:0,y:158.5,w:42,h:57.5},comment:"编组",time:"500",wait:"1300",animates:"slideInLeft",class:""},
                {type:"img",src:"img/page_7_045.png",rect:{x:251.5,y:251.5,w:68.5,h:57},comment:"路径",time:"500",wait:"1300",animates:"slideInRight",class:""},
                //{type:"img",src:"img/page_7_046.png",rect:{x:36,y:85,w:250.5,h:206},comment:"+路",time:"1000",wait:"",animates:"rotateIn",class:""},
                {type:"img",src:"img/page_7_054.png",rect:{x:172.5,y:405.5,w:36.5,h:7.5},comment:"图层_16",time:"500",wait:"4800",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_055.png",rect:{x:172.5,y:381,w:90.5,h:8},comment:"图层_15",time:"500",wait:"4400",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_056.png",rect:{x:172.5,y:357,w:29.5,h:8},comment:"图层_14",time:"500",wait:"4000",animates:"fadeIn",class:""},

                {type:"img",src:"img/page_7_057.png",rect:{x:64.5,y:429.5,w:54,h:8},comment:"图层_13",time:"500",wait:"3800",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_058.png",rect:{x:64.5,y:405,w:53,h:8},comment:"图层_12",time:"500",wait:"3700",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_059.png",rect:{x:64.5,y:381.5,w:39.5,h:10},comment:"图层_11",time:"500",wait:"3500",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_060.png",rect:{x:64.5,y:357.5,w:58,h:7.5},comment:"图层_10",time:"500",wait:"3300",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_7_061.png",rect:{x:64.5,y:333,w:26,h:8},comment:"图层_9",time:"500",wait:"3100",animates:"fadeIn",class:""},

                {type:"img",src:"img/page_7_062.png",rect:{x:91.5,y:31.5,w:136.5,h:14},comment:"OUR_PRESENCE",time:"800",wait:"1000",animates:"slideInDown",class:""},
                {type:"div",id:"hand3",pos:"absolute",background:"",rect:{x:147,y:460,w:52.5,h:28.5},comment:"编组",time:"100",wait:"5200",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/left_hand.png",rect:{x:0,y:0,w:52.5,h:28.5},comment:"left_hand",time:"1000",wait:"",class:"",animates:"shakeTopBottom",count:"infinite"},
                        {type:"img",src:"img/top.png",rect:{x:1,y:20,w:15,h:14},comment:"编组",time:"1000",wait:"",animates:"shakeTop",count:"infinite"}


                    ]
                }

            ]
        },
        {
            id:"page_8",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"img/page_8_031.png",rect:{x:29,y:401,w:261,h:48.5},comment:"GomePlus_i_y_est",time:"500",wait:"10600",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_8_032.png",rect:{x:31,y:369.5,w:257,h:19},comment:"Global_Strategy_of_GomePlus",time:"500",wait:"10400",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_8_033.png",rect:{x:39.5,y:52.5,w:447,h:155.5},comment:"路径",time:"500",wait:"9800",class:"",animates:"fadeIn",id:"map"},
                {type:"img",src:"img/page_8_034.png",rect:{x:164.5,y:275.5,w:89,h:18},comment:"图层_19",time:"500",wait:"10000",animates:"fadeIn"},
                {type:"img",src:"img/page_8_035.png",rect:{x:72,y:276.5,w:76,h:16.5},comment:"图层_18",time:"500",wait:"10000",animates:"fadeIn"},
                {type:"img",src:"img/page_8_03.png",rect:{x:146,y:305.5,w:33,h:50},comment:"图层_18",time:"500",wait:"10200",animates:"fadeIn"},
                {type:"img",src:"img/hander.png",rect:{x:158.5,y:449,w:2,h:63.5},comment:"left_hand",time:"800",wait:"10700",class:"",animates:"fadeIn",count:""},
                //       {type:"img",src:"img/page_8_04.png",rect:{x:160,y:329.5,w:18.5,h:27},comment:"图层_18",time:"2000",wait:"12800",class:"",animates:"swing",count:"infinite"},

                {type:"div",id:"swing0",pos:"absolute",background:"",rect:{x:160,y:329.5,w:18.5,h:27},comment:"编组",time:"100",wait:"9500",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/page_8_04.png",rect:{x:0,y:0,w:18.5,h:27},comment:"left_hand",time:"1000",wait:"",class:"",animates:"swing",count:"infinite"}

                    ]
                },
                // {type:"img",src:"img/left_hand.png",rect:{x:151,y:460,w:52.5,h:28.5},comment:"left_hand",time:"800",wait:"13200",class:"",animates:"shakeTopBottom",count:"infinite"},

                {type:"div",id:"hand4",pos:"absolute",background:"",rect:{x:151,y:466,w:52.5,h:28.5},comment:"编组",time:"100",wait:"10000",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/left_hand.png",rect:{x:0.5,y:0,w:52.5,h:28.5},comment:"left_hand",time:"1000",wait:"",class:"",animates:"shakeTopBottom",count:"infinite"},
                        {type:"img",src:"img/top.png",rect:{x:1.5,y:20,w:15,h:14},comment:"编组",time:"1000",wait:"",animates:"shakeTop",count:"infinite"}


                    ]
                }

            ]
        },
        {
            id:"page_9",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"img/page_9_016.png",rect:{x:32.5,y:134.5,w:17.5,h:6.5},comment:"User",time:"300",wait:"1300",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_9_027.png",rect:{x:25.5,y:93,w:31,h:31},comment:"编组",time:"300",wait:"1200",animates:"fadeIn",class:""},

                {type:"img",src:"img/page_9_026.png",rect:{x:85,y:92.5,w:32,h:32.5},comment:"编组",time:"300",wait:"1400",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_9_017.png",rect:{x:83,y:151,w:37.5,h:30.5},comment:"Social_Share_Cashback",time:"300",wait:"1500",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_9_018.png",rect:{x:81.5,y:134,w:38.5,h:7},comment:"GomePlus",time:"300",wait:"1400",animates:"fadeIn",class:""},

                {type:"img",src:"img/page_9_029.png",rect:{x:172,y:94.5,w:29.5,h:28},comment:"编组",time:"300",wait:"1600",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_9_019.png",rect:{x:158.5,y:134,w:60,h:9},comment:"GoodsServices",time:"300",wait:"1700",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_9_020.png",rect:{x:167.5,y:150.5,w:40.5,h:55},comment:"PlatformA_PlatformB..",time:"300",wait:"1800",animates:"fadeIn",class:""},

                {type:"img",src:"img/page_9_028.png",rect:{x:258.5,y:93.5,w:27,h:30},comment:"编组",time:"300",wait:"2000",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_9_021.png",rect:{x:249.5,y:134.5,w:46,h:6.5},comment:"E-commerce",time:"300",wait:"2200",animates:"fadeIn",class:""},

                {type:"img",src:"img/page_9_022.png",rect:{x:79,y:225,w:24.5,h:8},comment:"Guide",time:"300",wait:"3000",animates:"fadeIn",class:""},
                {type:"img",src:"img/page_9_023.png",rect:{x:195.5,y:225,w:18.5,h:8},comment:"Deal",time:"300",wait:"3300",animates:"fadeIn",class:""},

                {type:"img",src:"img/page_9_024.png",rect:{x:109,y:318,w:183,h:87.5},comment:"Our_of_go",time:"500",wait:"5500",animates:"slideInRight",class:""},
                {type:"img",src:"img/page_9_025.png",rect:{x:110.5,y:288,w:87.5,h:14.5},comment:"GomePlus",time:"500",wait:"4800",animates:"slideInRight",class:""},
                //	{type:"img",src:"img/left_hand.png",rect:{x:242,y:460,w:52.5,h:28.5},comment:"left_hand",time:"800",wait:"12000",class:"",animates:"shakeTopBottom",count:"infinite"}
                {type:"div",id:"hand5",pos:"absolute",background:"",rect:{x:241,y:460,w:52.5,h:28.5},comment:"编组",time:"100",wait:"8300",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/left_hand.png",rect:{x:0,y:0,w:52.5,h:28.5},comment:"left_hand",time:"1000",wait:"",class:"",animates:"shakeTopBottom",count:"infinite"},
                        {type:"img",src:"img/top.png",rect:{x:1,y:20,w:15,h:14},comment:"编组",time:"1000",wait:"",animates:"shakeTop",count:"infinite"}


                    ]
                }

            ]
        },
        {
            id:"page_10",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"img/page_10_010.png",rect:{x:264,y:353.5,w:33,h:50},comment:"编组",time:"300",wait:"2600",class:"",animates:"fadeIn"},
                {type:"div",id:"swing1",pos:"absolute",background:"",rect:{x:281,y:377.5,w:19,h:27.5},comment:"编组",time:"300",wait:"2700",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/page_10_011.png",rect:{x:0,y:0,w:19,h:27.5},comment:"编组",time:"2000",wait:"",class:"",animates:"swing",count:"infinite"},

                    ]
                },
                {type:"div",id:"picture",dis:"",pos:"absolute",rect:{x:73.5,y:106,w:173.5,h:314},comment:"编组",time:"1000",wait:"2300",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/page_10_014.png",rect:{x:2,y:0,w:173.5,h:308.5},comment:"图层_20",time:"",wait:"",class:"picture_3",animates:"",dis:"none"},
                        {type:"img",src:"img/page_10_013.png",rect:{x:2,y:0,w:173.5,h:308.5},comment:"图层_24",time:"",wait:"",class:"picture_2",animates:"",dis:"none"},
                        {type:"img",src:"img/page_10_012.png",rect:{x:2,y:0,w:173.5,h:308.5},comment:"图层_23",time:"",wait:"",class:"picture_1",animates:"",dis:""},
                    ]},
                //{type:"img",src:"img/page_10_012.png",rect:{x:73.5,y:106,w:173.5,h:307},comment:"图层_20",time:"",wait:"",class:"picture_3",animates:"",dis:"none"},
                //{type:"img",src:"img/page_10_014.png",rect:{x:73.5,y:106,w:173.5,h:307},comment:"图层_23",time:"",wait:"",class:"picture_4",animates:"",dis:"none"}
                //	{type:"img",src:"img/left_hand.png",rect:{x:153,y:460,w:52.5,h:28.5},comment:"left_hand",time:"800",wait:"3000",class:"",animates:"shakeTopBottom",count:"infinite"}
                {type:"div",id:"hand6",pos:"absolute",background:"",rect:{x:153,y:465,w:52.5,h:28.5},comment:"编组",time:"100",wait:"3500",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/left_hand.png",rect:{x:1,y:0,w:52.5,h:28.5},comment:"left_hand",time:"1000",wait:"",class:"",animates:"shakeTopBottom",count:"infinite"},
                        {type:"img",src:"img/top.png",rect:{x:1,y:20,w:15,h:14},comment:"编组",time:"1000",wait:"",animates:"shakeTop",count:"infinite"}

                    ]
                },
                {type:"div",id:"dot",pos:"absolute",background:"",rect:{x:140,y:417,w:5,h:5},comment:"编组",time:"100",wait:"3200",animates:"fadeIn",class:"",
                    dom:[
                        {type:"img",src:"img/red.png",rect:{x:5,y:0,w:4,h:4},comment:"left_hand",time:"1000",wait:"",class:"dot1_red",animates:"",count:""},
                        {type:"img",src:"img/grey.png",rect:{x:5,y:0,w:4,h:4},comment:"left_hand",time:"1000",wait:"",class:"dot1_grey",animates:"",count:"",no_dis:"none"},

                        {type:"img",src:"img/red.png",rect:{x:19.5,y:0,w:4,h:4},comment:"left_hand",time:"1000",wait:"",class:"dot2_red",animates:"",count:"",no_dis:"none"},
                        {type:"img",src:"img/grey.png",rect:{x:19.5,y:0,w:4,h:4},comment:"left_hand",time:"1000",wait:"",class:"dot2_grey",animates:"",count:""},

                        {type:"img",src:"img/red.png",rect:{x:35,y:0,w:4,h:4},comment:"left_hand",time:"1000",wait:"",class:"dot3_red",animates:"",count:"",no_dis:"none"},
                        {type:"img",src:"img/grey.png",rect:{x:35,y:0,w:4,h:4},comment:"left_hand",time:"1000",wait:"",class:"dot3_grey",animates:"",count:""},

                    ]
                }

            ]
        },
        {
            id:"page_11",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"img/page_11_002.png",rect:{x:35,y:421,w:123.5,h:9.5},comment:"cooperate@gomeplus.com_",time:500,wait:7700,animates:"fadeIn"},
                {type:"img",src:"img/page_11_003.png",rect:{x:34,y:397,w:27,h:16.5},comment:"编组",time:500,wait:7300,class:"fadeIn"},
                {type:"img",src:"img/page_11_004.png",rect:{x:209,y:388,w:69.5,h:70.5},comment:"剪切组",time:500,wait:8300,class:"fadeIn"},

                {type:"img",src:"img/page_11_006.png",rect:{x:34,y:221,w:124,h:12.5},comment:"Address_in_China：",time:500,wait:4500,animates:"slideInLeft"},
                {type:"img",src:"img/page_11_005.png",rect:{x:35,y:244,w:201,h:36},comment:"L",time:500,wait:5000,class:"fadeIn"},

                {type:"img",src:"img/page_11_007.png",rect:{x:35,y:303.5,w:119,h:12.5},comment:"Address_in_India：",time:500,wait:5500,animates:"slideInLeft"},
                {type:"img",src:"img/page_11_008.png",rect:{x:34.5,y:327.5,w:176.5,h:48.5},comment:"The",time:500,wait:6000,animates:"slideInLeft"}

            ]
        },
        {
            id:"page_0",
            animation:[],
            rect:{w:22.5,h:19.5,x:278,y:15},
            display:"none",
            dom:[
                {type:"img",src:"img/music_on.png",rect:{x:0,y:0,w:22.5,h:19.5},comment:"WHO_IS_GOMEPLUS",time:"",wait:"",class:"button_music_on",dis:"none"},
                {type:"img",src:"img/music_off.png",rect:{x:0,y:0,w:22.5,h:19.5},comment:"Touch&Know",time:"",wait:"",class:"button_music_off",dis:"none"}
            ]
        }
    ]
};