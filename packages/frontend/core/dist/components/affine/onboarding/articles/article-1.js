import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from 'clsx';
import { CounterNote } from '../switch-widgets/counter-note';
import { PageLink } from '../switch-widgets/page-link';
import bookmark1png from './assets/article-1-bookmark-1.png';
import illustration1png from './assets/article-1-illustration-1.png';
import Article1Illustration2 from './assets/article-1-illustration-2';
import { hr, link, quote } from './blocks.css';
import { BlogLink } from './blog-link';
export const article1 = [
    {
        children: _jsx("h1", { children: "This is Local-first software" }),
        offset: { x: -600, y: 0 },
    },
    {
        bg: '#F5F5F5',
        children: (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Local-first software" }), _jsx("h3", { children: "You own your data, in spite of the cloud" }), _jsxs("p", { children: ["Cloud apps like ", _jsx("a", { className: link, children: "Google Docs" }), " and", ' ', _jsx("a", { className: link, children: "Trello" }), " are popular because they enable real-time collaboration with colleagues, and they make it easy for us to access our work from all of our devices. However, by centralizing data storage on servers, cloud apps also take away ownership and agency from users.", ' ', _jsx("b", { children: "If a service shuts down, the software stops functioning, and data created with that software is lost." })] })] })),
        offset: { x: -570, y: 80 },
        sub: {
            children: (_jsx(CounterNote, { index: 1, width: 500, label: "Cloud apps enable collaboration but can jeopardize data ownership; time varies.", animationDelay: 300, color: "#E660A4" })),
            edgelessOnly: true,
            enterDelay: 300,
            position: {},
            style: { bottom: 'calc(100% + 20px)', left: -40 },
        },
    },
    {
        bg: '#F3F0FF',
        children: (_jsxs(_Fragment, { children: [_jsx("img", { draggable: false, width: "100%", src: bookmark1png }), _jsx("p", { className: clsx(quote), children: "If you are an entrepreneur interested in building developer infrastructure, all of the above suggests an interesting market opportunity: \u201CFirebase for CRDTs.\u201D" }), _jsxs("p", { children: ["In this article we propose ", _jsx(PageLink, { children: "local-first software" }), ' ', "of principles for software that enables both collaboration"] })] })),
        offset: { x: -570, y: 200 },
        sub: {
            children: (_jsx(CounterNote, { index: 2, width: 300, label: "Local-first software emphasizes collaboration, ownership, and data control for users.", animationDelay: 600, color: "#E660A4" })),
            edgelessOnly: true,
            enterDelay: 600,
            position: {},
            style: { bottom: 'calc(100% + 20px)', left: -40 },
        },
    },
    {
        bg: '#DFF4F3',
        children: (_jsxs(_Fragment, { children: [_jsx("p", { children: "We survey existing approaches to data storage and sharing, ranging from email attachments to web apps to Firebase-backed mobile apps, and we examine the trade-offs of each. We look at Conflict-free Replicated Data Types (CRDTs): data structures that are multi-user from the ground up while also being fundamentally local and private. CRDTs have the potential to be a foundational technology for realizing local-first software." }), _jsx("hr", { className: hr }), _jsxs("p", { children: ["We share some of our findings from developing local-first software prototypes at ", _jsx("a", { className: link, children: "Ink & Switch" }), " over the course of several years. These experiments test the viability of CRDTs in practice, and explore the user interface challenges for this new data model. Lastly, we suggest some next steps for moving towards local-first software: for researchers, for app developers, and a startup opportunity for entrepreneurs."] })] })),
        offset: { x: 290, y: -140 },
        sub: {
            children: (_jsx(CounterNote, { index: 3, width: 300, label: "Examining data storage, CRDTs' role, prototypes, and future possibilities.", animationDelay: 900, color: "#E660A4" })),
            edgelessOnly: true,
            enterDelay: 900,
            position: {},
            style: { bottom: 'calc(100% + 20px)', left: -40 },
        },
    },
    {
        bg: '#FFF4D8',
        children: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["This article has also been ", _jsx("a", { className: link, children: "published in PDF" }), ' ', "format in the proceedings of the", ' ', _jsx("a", { className: link, children: "Onward! 2019 conference" }), ". Please cite it as:"] }), _jsxs("p", { className: clsx(quote), children: ["Martin Kleppmann, Adam Wiggins, Peter van Hardenberg, and Mark McGranaghan. Local-first software: you own your data, in spite of the cloud. 2019 ACM SIGPLAN International Symposium on New Ideas, New Paradigms, and Reflections on Programming and Software (Onward!), October 2019, pages 154\u2013178.", ' ', _jsx("a", { className: link, children: "doi:10.1145/3359591.3359737" })] }), _jsxs("p", { children: ["We welcome your feedback: ", _jsx("a", { className: link, children: "@inkandswitch" }), " or", _jsx("a", { className: link, children: "hello@inkandswitch.com" }), "."] })] })),
        offset: { x: 350, y: -850 },
    },
    {
        bg: '#E1EFFF',
        children: (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Contents" }), _jsxs("h3", { children: ["Motivation: collaboration and ownership.", _jsx("br", {}), "Seven ideals for local-first software"] }), _jsxs("ol", { children: [_jsx("li", { children: "No spinners: your work at your fingertips" }), _jsx("li", { children: _jsx("a", { className: link, children: "Your work is not trapped on one device" }) }), _jsx("li", { children: _jsx(PageLink, { children: "The network is optional" }) }), _jsx("li", { children: "Seamless collaboration with your colleagues" }), _jsx("li", { children: _jsx(PageLink, { children: "The Long Now" }) }), _jsx("li", { children: "Security and privacy by default" }), _jsx("li", { children: "You retain ultimate ownership and control" })] }), _jsx("h3", { children: "Existing data storage and sharing models" }), _jsxs("ul", { children: [_jsx("li", { children: "How application architecture affects user experience" }), _jsx("li", { children: "Developer infrastructure for building apps" })] }), _jsx("h3", { children: "Towards a better future" }), _jsxs("ul", { children: [_jsx("li", { children: "CRDTs as a foundational technology" }), _jsx("li", { children: "Ink & Switch prototypes" }), _jsx("li", { children: "How you can help" })] }), _jsx("h3", { children: "Conclusions" }), _jsx("ul", { children: _jsx("li", { children: "Acknowledgments" }) })] })),
        offset: { x: 300, y: -250 },
        customStyle: { edgeless: { width: 500 } },
        sub: {
            children: (_jsx(CounterNote, { index: 4, width: 400, label: "Motivation, ideals, existing models, architecture, CRDTs, prototypes, future, help, conclusions.", animationDelay: 1200, color: "#E660A4" })),
            edgelessOnly: true,
            enterDelay: 1200,
            position: {},
            style: { bottom: 'calc(100% + 20px)', left: -40 },
        },
    },
    {
        bg: '#FFE1E1',
        children: (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Motivation: collaboration and ownership" }), _jsx("p", { children: "It\u2019s amazing how easily we can collaborate online nowadays. We use Google Docs to collaborate on documents, spreadsheets and presentations; in Figma we work together on user interface designs; we communicate with colleagues using Slack; we track tasks in Trello; and so on. We depend on these and many other online services, e.g. for taking notes, planning projects or events, remembering contacts, and a whole raft of business uses." }), _jsx("p", { children: "Today\u2019s cloud apps offer big benefits compared to earlier generations of software: seamless collaboration, and being able to access data from any device. As we run more and more of our lives and work through these cloud apps, they become more and more critical to us. The more time we invest in using one of these apps, the more valuable the data in it becomes to us." }), _jsx("p", { children: "However, in our research we have spoken to a lot of creative professionals, and in that process we have also learned about the downsides of cloud apps." }), _jsx("p", { children: "When you have put a lot of creative energy and effort into making something, you tend to have a deep emotional attachment to it. If you do creative work, this probably seems familiar. (When we say \u201Ccreative work,\u201D we mean not just visual art, or music, or poetry \u2014 many other activities, such as explaining a technical topic, implementing an intricate algorithm, designing a user interface, or figuring out how to lead a team towards some goal are also creative efforts.)" }), _jsx(BlogLink, {})] })),
        offset: { x: 900, y: -950 },
        sub: {
            children: (_jsx(CounterNote, { index: 5, width: 400, label: "Online collaboration's benefits but emotional attachment and downsides discussed.", animationDelay: 1500, color: "#E660A4" })),
            edgelessOnly: true,
            enterDelay: 1500,
            position: {},
            style: { bottom: 'calc(100% + 20px)', left: -40 },
        },
    },
    {
        children: _jsx("img", { width: 784, draggable: false, src: illustration1png }),
        edgelessOnly: true,
        position: { x: -600, y: 1000 },
        fromPosition: { x: -1000, y: 1500 },
        enterDelay: 250,
    },
    {
        children: _jsx(Article1Illustration2, {}),
        edgelessOnly: true,
        position: { x: 1200, y: 500 },
        fromPosition: { x: 1800, y: -100 },
        enterDelay: 200,
    },
];
//# sourceMappingURL=article-1.js.map