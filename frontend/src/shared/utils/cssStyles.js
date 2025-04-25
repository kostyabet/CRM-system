import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function getDirection(value = 'bottom') {
    return {
        bottom: 'to bottom',
        left: 'to left',
        right: 'to right',
        top: 'to top',
    }[value];
}

export function bgGradient(props) {
    const direction = props?.direction || 'to bottom';
    const startColor = props?.startColor;
    const endColor = props?.endColor;
    const imgUrl = props?.imgUrl;
    const color = props?.color;
  
    if (imgUrl) {
      return {
        background: `linear-gradient(${direction}, ${startColor || color}, ${
          endColor || color
        }), url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      };
    }
  
    return {
      background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
    };
  }
  

export function bgBlur(props) {
    const color = props?.color || '#000000';
    const blur = props?.blur || 6;
    const opacity = props?.opacity || 0.8;
    const imgUrl = props?.imgUrl;

    if (imgUrl) {
        return {
            '&:before': {
                WebkitBackdropFilter: `blur(${blur}px)`,
                backdropFilter: `blur(${blur}px)`,
                backgroundColor: alpha(color, opacity),
                content: '""',
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: 9,
            },
            backgroundImage: `url(${imgUrl})`,
            position: 'relative',
        };
    }

    return {
        WebkitBackdropFilter: `blur(${blur}px)`,
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
    };
}

// ----------------------------------------------------------------------

export default function cssStyles(theme) {
    return {
        bgBlur: (props) => {
            const color =
                props?.color || theme?.palette.background.default || '#000000';

            const blur = props?.blur || 6;
            const opacity = props?.opacity || 0.8;

            return {
                WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile
                backdropFilter: `blur(${blur}px)`,
                backgroundColor: alpha(color, opacity),
            };
        },
        bgGradient: (props) => {
            const direction = getDirection(props?.direction);
            const startColor = props?.startColor || `${alpha('#000000', 0)} 0%`;
            const endColor = props?.endColor || '#000000 75%';

            return {
                background: `linear-gradient(${direction}, ${startColor}, ${endColor});`,
            };
        },
        bgImage: (props) => {
            const url = props?.url || '/assets/bg_gradient.jpg';
            const direction = getDirection(props?.direction);
            const startColor =
                props?.startColor ||
                alpha(theme?.palette.grey[900] || '#000000', 0.88);
            const endColor =
                props?.endColor ||
                alpha(theme?.palette.grey[900] || '#000000', 0.88);

            return {
                background: `linear-gradient(${direction}, ${startColor}, ${endColor}), url(${url})`,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            };
        },
    };
}
