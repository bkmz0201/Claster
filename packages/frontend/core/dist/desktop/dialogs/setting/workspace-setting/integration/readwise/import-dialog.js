import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Checkbox, Divider, Loading, Modal, notify, Scrollable, } from '@affine/component';
import { IntegrationService } from '@affine/core/modules/integration';
import { i18nTime, Trans, useI18n } from '@affine/i18n';
import { InformationFillDuotoneIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { Virtuoso } from 'react-virtuoso';
import * as styles from './import-dialog.css';
import { readwiseTrack } from './track';
export const ImportDialog = ({ onClose }) => {
    const t = useI18n();
    const readwise = useService(IntegrationService).readwise;
    const crawler = readwise.crawler;
    const [importProgress, setImportProgress] = useState(0);
    const crawlingData = useLiveData(crawler.data$);
    const error = useLiveData(crawler.error$);
    const loading = useLiveData(crawler.crawling$);
    const highlights = useMemo(() => crawlingData?.highlights ?? [], [crawlingData]);
    const books = useMemo(() => crawlingData?.books ?? {}, [crawlingData]);
    const timestamp = crawlingData?.startTime;
    const [stage, setStage] = useState('select');
    const abortControllerRef = useRef(null);
    const onOpenChange = useCallback((open) => {
        if (!open)
            onClose();
    }, [onClose]);
    const handleConfirmImport = useCallback((ids) => {
        readwiseTrack.confirmIntegrationImport({
            control: 'Readwise import list',
            method: readwise.setting$('lastImportedAt').value
                ? 'withtimestamp'
                : 'new',
        });
        if (ids.length === 0) {
            onClose();
            return;
        }
        setStage('writing');
        const selectedHighlights = highlights.filter(h => ids.includes(h.id));
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        const signal = abortController.signal;
        const startTime = Date.now();
        readwise
            .highlightsToAffineDocs(selectedHighlights.reverse(), books, {
            signal,
            onProgress: setImportProgress,
            onComplete: () => {
                readwiseTrack.completeIntegrationImport({
                    total: selectedHighlights.length,
                    done: selectedHighlights.length,
                    time: (Date.now() - startTime) / 1000,
                });
                readwise.updateSetting('lastImportedAt', timestamp);
                onClose();
            },
            onAbort: finished => {
                readwiseTrack.abortIntegrationImport({
                    total: selectedHighlights.length,
                    done: finished,
                    time: (Date.now() - startTime) / 1000,
                });
                notify({
                    icon: _jsx(InformationFillDuotoneIcon, {}),
                    style: 'normal',
                    alignMessage: 'icon',
                    title: t['com.affine.integration.readwise.import.abort-notify-title'](),
                    message: t.t('com.affine.integration.readwise.import.abort-notify-desc', { finished }),
                });
            },
        })
            .catch(console.error);
    }, [books, highlights, onClose, readwise, t, timestamp]);
    const handleStopImport = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        setStage('select');
        setImportProgress(0);
    }, []);
    const handleRetryCrawl = useCallback(() => {
        crawler.abort();
        crawler.crawl();
    }, [crawler]);
    useEffect(() => {
        return () => {
            // reset crawler
            crawler.reset();
            // stop importing
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                abortControllerRef.current = null;
            }
        };
    }, [crawler]);
    useEffect(() => {
        crawler.crawl();
        return () => {
            crawler.abort();
        };
    }, [crawler]);
    return (_jsx(Modal, { open: true, contentOptions: { className: clsx(styles.importDialog, stage) }, onOpenChange: onOpenChange, withoutCloseButton: stage === 'writing', persistent: stage === 'writing', children: stage === 'select' ? (error ? (_jsx(CrawlerError, { onRetry: handleRetryCrawl })) : (_jsx(SelectStage, { loading: loading, highlights: highlights, onClose: onClose, onConfirm: handleConfirmImport, onResetLastImportedAt: handleRetryCrawl }))) : (_jsx(WritingStage, { progress: importProgress, onStop: handleStopImport })) }));
};
const CrawlerError = ({ onRetry }) => {
    return (_jsxs(_Fragment, { children: ["Unexpected error occurred, please try again.", _jsx(Button, { onClick: onRetry, children: "Retry" })] }));
};
const SelectStage = ({ loading, highlights, onClose, onConfirm, onResetLastImportedAt, }) => {
    const t = useI18n();
    const readwise = useService(IntegrationService).readwise;
    const settings = useLiveData(readwise.settings$);
    const lastImportedAt = settings?.lastImportedAt;
    const [selected, setSelected] = useState([]);
    const handleResetLastImportedAt = useCallback(() => {
        readwiseTrack.startIntegrationImport({
            method: 'cleartimestamp',
            control: 'Readwise import list',
        });
        readwise.updateSetting('lastImportedAt', undefined);
        onResetLastImportedAt();
    }, [onResetLastImportedAt, readwise]);
    const handleConfirmImport = useCallback(() => {
        onConfirm(selected);
    }, [onConfirm, selected]);
    // select all highlights when highlights changed
    useEffect(() => {
        if (!loading) {
            setSelected(highlights.map(h => h.id));
        }
    }, [highlights, loading]);
    return (_jsxs(_Fragment, { children: [_jsxs("header", { children: [_jsx("h3", { className: styles.title, children: t['com.affine.integration.readwise.import.title']() }), _jsx("div", { className: styles.desc, children: lastImportedAt ? (_jsx(Trans, { i18nKey: "com.affine.integration.readwise.import.desc-from-last", values: {
                                lastImportedAt: i18nTime(lastImportedAt, {
                                    absolute: { accuracy: 'second' },
                                }),
                            }, components: {
                                a: (_jsx("a", { href: "#", className: styles.resetLastImportedAt, onClick: handleResetLastImportedAt })),
                            } })) : (t['com.affine.integration.readwise.import.desc-from-start']()) }), _jsx(Divider, { size: "thinner" })] }), _jsx("main", { className: styles.content, children: loading ? (_jsxs("div", { className: styles.loading, children: [_jsx(Loading, {}), t['Loading']()] })) : highlights.length > 0 ? (_jsx(HighlightTable, { selected: selected, setSelected: setSelected, highlights: highlights })) : (_jsx(HighlightEmpty, {})) }), _jsxs("footer", { children: [_jsx(Divider, { size: "thinner", className: styles.footerDivider }), _jsxs("div", { className: styles.actions, children: [_jsx(Button, { onClick: onClose, children: t['Cancel']() }), _jsx(Button, { disabled: loading || (selected.length === 0 && highlights.length !== 0), variant: "primary", onClick: handleConfirmImport, children: t['Confirm']() })] })] })] }));
};
const Scroller = forwardRef(function Scroller(props, ref) {
    return (_jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { ref: ref, ...props }), _jsx(Scrollable.Scrollbar, {})] }));
});
const HighlightTable = ({ selected, setSelected, highlights, }) => {
    const t = useI18n();
    const readwise = useService(IntegrationService).readwise;
    const [updatedMap, setUpdatedMap] = useState();
    const syncNewHighlights = useLiveData(useMemo(() => readwise.setting$('syncNewHighlights'), [readwise]));
    const updateStrategy = useLiveData(useMemo(() => readwise.setting$('updateStrategy'), [readwise]));
    useEffect(() => {
        readwise
            .getRefs()
            .then(refs => {
            setUpdatedMap(refs.reduce((acc, ref) => {
                acc[ref.refMeta.highlightId] = ref.refMeta.updatedAt;
                return acc;
            }, {}));
        })
            .catch(console.error);
    }, [readwise]);
    const handleToggleSelectAll = useCallback((_, checked) => {
        readwiseTrack.selectIntegrationImport({
            method: 'all',
            option: checked ? 'on' : 'off',
            control: 'Readwise import list',
        });
        setSelected(checked ? highlights.map(h => h.id) : []);
    }, [highlights, setSelected]);
    return (_jsxs("div", { className: styles.table, children: [_jsxs("div", { className: styles.tableHeadRow, children: [_jsx("div", { className: styles.tableCellSelect, children: _jsx(Checkbox, { checked: selected.length === highlights.length, onChange: handleToggleSelectAll }) }), _jsx("div", { className: styles.tableCellTitle, children: t['com.affine.integration.readwise.import.cell-h-content']() }), _jsx("div", { className: styles.tableCellTodo, children: t['com.affine.integration.readwise.import.cell-h-todo']() }), _jsx("div", { className: styles.tableCellTime, children: t['com.affine.integration.readwise.import.cell-h-time']() })] }), _jsx(Virtuoso, { className: styles.tableContent, totalCount: highlights.length, itemContent: idx => {
                    const highlight = highlights[idx];
                    const localUpdatedAt = updatedMap?.[highlight.id];
                    const readwiseUpdatedAt = highlight.updated_at;
                    const action = readwise.getAction({
                        localUpdatedAt,
                        remoteUpdatedAt: readwiseUpdatedAt,
                        updateStrategy,
                        syncNewHighlights,
                    });
                    return (_jsxs("li", { className: styles.tableBodyRow, children: [_jsx("div", { className: styles.tableCellSelect, children: _jsx(Checkbox, { checked: selected.includes(highlight.id), onChange: (_, checked) => {
                                        readwiseTrack.selectIntegrationImport({
                                            method: 'single',
                                            option: checked ? 'on' : 'off',
                                            control: 'Readwise import list',
                                        });
                                        setSelected(checked
                                            ? [...selected, highlight.id]
                                            : selected.filter(id => id !== highlight.id));
                                    } }) }), _jsx("div", { className: styles.tableCellTitle, children: _jsx("a", { href: highlight.readwise_url, target: "_blank", rel: "noreferrer", className: styles.tableCellLink, children: highlight.text }) }), _jsx("div", { className: styles.tableCellTodo, children: action === 'new' ? (_jsx("span", { className: styles.todoNew, children: t['com.affine.integration.readwise.import.todo-new']() })) : action === 'skip' ? (_jsx("span", { className: styles.todoSkip, children: t['com.affine.integration.readwise.import.todo-skip']() })) : (_jsx("span", { className: styles.todoUpdate, children: t['com.affine.integration.readwise.import.todo-update']() })) }), _jsx("div", { className: styles.tableCellTime, children: i18nTime(readwiseUpdatedAt, {
                                    absolute: { accuracy: 'second' },
                                }) })] }));
                }, components: { Scroller } })] }));
};
const HighlightEmpty = () => {
    const t = useI18n();
    return (_jsx("div", { className: styles.empty, children: t['com.affine.integration.readwise.import.empty']() }));
};
const WritingStage = ({ progress, onStop, }) => {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: styles.importingHeader, children: [_jsx(Loading, { speed: 0, progress: progress, className: styles.importingLoading, size: 24, strokeWidth: 3 }), _jsx("h3", { className: styles.importingTitle, children: t['com.affine.integration.readwise.import.importing']() })] }), _jsx("main", { className: styles.importingDesc, children: t['com.affine.integration.readwise.import.importing-desc']() }), _jsx("footer", { className: styles.importingFooter, children: _jsx(Button, { variant: "error", onClick: onStop, children: t['com.affine.integration.readwise.import.importing-stop']() }) })] }));
};
//# sourceMappingURL=import-dialog.js.map