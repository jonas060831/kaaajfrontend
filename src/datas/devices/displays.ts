export interface IDisplays {
    id: number;
    available: boolean
    name: string;
    dimension: string;
    description: string[];
    images: any,
    videos: any,
    disabled: boolean
}

const displays:IDisplays[] = [
    {
        id: 0,
        available: true,
        name: 'Transparent LED Display',
        disabled: false,
        dimension: '',
        description: [
            "Transparency rates up to 95%",
            "Flexible Soft",
            "Self Adhesive",
            "Ultra Thin Display just 2.5mm",
        ],
        images: {
            default: '',
            list: [
                ''
            ]
        },
        videos: {
            default: 'public/videos/displays/tld.mp4',
            list: [
                'public/videos/displays/tld.mp4'
            ]
        }
    },
    {
        id: 1,
        available: false,
        name: 'Holographic LED Display',
        disabled: true,
        dimension: '',
        description: [
            ""
        ],
        images: {
            default: '',
            list: [
                ''
            ]
        },
        videos: {
            default: 'public/videos/displays/tld.mp4',
            list: [
                'public/videos/displays/tld.mp4'
            ]
        }
    },
    {
        id: 2,
        available: true,
        name: 'Led Floor Tiles',
        disabled: true,
        dimension: '',
        description: [
            ""
        ],
        images: {
            default: '',
            list: [
                ''
            ]
        },
        videos: {
            default: 'public/videos/displays/tld.mp4',
            list: [
                'public/videos/displays/tld.mp4'
            ]
        }
    },
    {
        id: 3,
        available: true,
        name: 'Touch LED Display',
        disabled: true,
        dimension: '',
        description: [
            ""
        ],
        images: {
            default: '',
            list: [
                ''
            ]
        },
        videos: {
            default: 'public/videos/displays/tld.mp4',
            list: [
                'public/videos/displays/tld.mp4'
            ]
        }
    }
]

export default {
    displays
}