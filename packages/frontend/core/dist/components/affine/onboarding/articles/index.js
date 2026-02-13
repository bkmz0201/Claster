import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { article, articleWrapper, text, title } from '../curve-paper/paper.css';
// TODO(@catsjuice): lazy load
import { article0 } from './article-0';
import { article1 } from './article-1';
import { article2 } from './article-2';
import { article3 } from './article-3';
import { article4 } from './article-4';
const ids = ['0', '1', '2', '3', '4'];
/** locate paper */
const paperLocations = {
    '0': {
        x: 0,
        y: 0,
    },
    '1': {
        x: -240,
        y: -30,
    },
    '2': {
        x: 240,
        y: -35,
    },
    '3': {
        x: -480,
        y: 40,
    },
    '4': {
        x: 480,
        y: 50,
    },
};
/** paper enter animation config */
const paperEnterAnimationOriginal = {
    '0': {
        curveCenter: 3,
        curve: 292,
        delay: 800,
        fromZ: 1230,
        fromX: -76,
        fromY: 100,
        fromRotateX: 185,
        fromRotateY: -166,
        fromRotateZ: 252,
        toZ: 0,
        // toX: 12,
        // toY: -30,
        toRotateZ: 6,
        duration: '2s',
        easing: 'ease',
    },
    '1': {
        curveCenter: 4,
        curve: 390,
        delay: 0,
        fromZ: 3697,
        fromX: 25,
        fromY: -93,
        fromRotateX: 331,
        fromRotateY: 360,
        fromRotateZ: -257,
        toZ: 0,
        // toX: -18,
        // toY: -28,
        toRotateZ: -8,
        duration: '2s',
        easing: 'ease',
    },
    '2': {
        curveCenter: 3,
        curve: 1240,
        delay: 1700,
        fromZ: 27379,
        fromX: 2,
        fromY: -77,
        fromRotateX: 0,
        fromRotateY: 0,
        fromRotateZ: 0,
        toZ: 0,
        // toX: -3,
        // toY: -21,
        toRotateZ: 2,
        duration: '2s',
        easing: 'ease',
    },
    '3': {
        curveCenter: 1,
        curve: 300,
        delay: 1500,
        fromZ: 4303,
        fromX: -37,
        fromY: -100,
        fromRotateX: 360,
        fromRotateY: 360,
        fromRotateZ: 8,
        toZ: 0,
        // toX: -30,
        // toY: -9,
        toRotateZ: 2,
        duration: '2s',
        easing: 'ease',
    },
    '4': {
        curveCenter: 4,
        curve: 470,
        delay: 1571,
        fromZ: 1876,
        fromX: 65,
        fromY: 48,
        fromRotateX: 101,
        fromRotateY: 188,
        fromRotateZ: -200,
        toZ: 0,
        // toX: 24,
        // toY: -2,
        toRotateZ: 8,
        duration: '2s',
        easing: 'ease',
    },
};
export const paperEnterAnimations = paperEnterAnimationOriginal;
/** Brief content */
const paperBriefs = {
    '0': (_jsx("div", { className: articleWrapper, children: _jsxs("article", { className: article, children: [_jsx("h1", { className: title, children: "HOWTO: Be more productive" }), _jsx("p", { className: text, children: "\u201CWith all the time you spend watching TV,\u201D he tells me, \u201Cyou could have written a novel by now.\u201D It\u2019s hard to disagree with the sentiment \u2014 writing a novel is undoubtedly a better use of time than watching TV \u2014 but what about the hidden ..." })] }) })),
    '3': (_jsx("div", { className: articleWrapper, children: _jsxs("article", { className: article, children: [_jsx("h1", { className: title, children: "Breath of the Wild: Redefining Game Design" }), _jsx("p", { className: text, children: "At GDC 2017, Hidemaro Fujibayashi, Satoru Takizawa, and Takuhiro Dohta from Nintendo shared their insights on The Legend of Zelda: Breath of the Wild's groundbreaking game mechanics. One standout ..." })] }) })),
    '2': (_jsx("div", { className: articleWrapper, children: _jsxs("article", { className: article, children: [_jsx("h1", { className: title, children: "Learning with retrieval practice" }), _jsx("p", { className: text, children: "Are there any specific techniques to make the process of learning more effective?" }), _jsx("p", { className: text, children: "Students often re-read, underline, or highlight materials, thinking that it will help them learn better. But, the best method for really ..." })] }) })),
    '1': (_jsx("div", { className: articleWrapper, children: _jsxs("article", { className: article, children: [_jsxs("h1", { className: title, children: ["Local-first software", _jsx("br", {}), "You own your data, in spite of the cloud"] }), _jsx("p", { className: text, children: "Cloud apps like Google Docs and Trello are popular because they enable real-time collaboration with colleagues, and they make it easy for us to access our work from all of our devices. However, by centralizing ..." })] }) })),
    '4': (_jsx("div", { className: articleWrapper, children: _jsxs("article", { className: article, children: [_jsx("h1", { className: title, children: "More Is Different" }), _jsx("p", { className: text, children: "Broken symmetry and the nature of the hierarchical structure of science" }), _jsx("p", { className: text, children: "The reductionist hypothesis may still be a topic for controversy among philosophers, but among the great majority of active scientists I think it is accepted without ..." })] }) })),
};
const contents = {
    '0': article0,
    '1': article1,
    '2': article2,
    '3': article3,
    '4': article4,
};
const states = {
    '0': {
        scale: 0.5,
        offsetX: -330,
        offsetY: -380,
    },
    '1': {
        scale: 0.4,
        offsetX: -330,
        offsetY: -500,
    },
    '2': {
        scale: 0.45,
        offsetX: 0,
        offsetY: -380,
    },
    '3': {
        scale: 0.4,
        offsetX: 100,
        offsetY: -320,
    },
    '4': {
        scale: 0.48,
        offsetX: 10,
        offsetY: -220,
    },
};
export const articles = ids.reduce((acc, id) => {
    return Object.assign(acc, {
        [id]: {
            id,
            location: paperLocations[id],
            enterOptions: paperEnterAnimations[id],
            brief: paperBriefs[id],
            blocks: contents[id],
            initState: states[id],
        },
    });
}, {});
//# sourceMappingURL=index.js.map