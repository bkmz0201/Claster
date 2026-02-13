import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Loading } from '@affine/component';
import { Pagination, SettingRow } from '@affine/component/setting-components';
import { WorkspaceInvoicesService } from '@affine/core/modules/cloud';
import { UrlService } from '@affine/core/modules/url';
import { UserFriendlyError } from '@affine/error';
import { InvoiceStatus } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { useCallback, useEffect } from 'react';
import * as styles from './styles.css';
export const BillingHistory = () => {
    const t = useI18n();
    const invoicesService = useService(WorkspaceInvoicesService);
    const pageInvoices = useLiveData(invoicesService.invoices.pageInvoices$);
    const invoiceCount = useLiveData(invoicesService.invoices.invoiceCount$);
    const isLoading = useLiveData(invoicesService.invoices.isLoading$);
    const error = useLiveData(invoicesService.invoices.error$);
    const pageNum = useLiveData(invoicesService.invoices.pageNum$);
    useEffect(() => {
        invoicesService.invoices.revalidate();
    }, [invoicesService]);
    const handlePageChange = useCallback((_, pageNum) => {
        invoicesService.invoices.setPageNum(pageNum);
        invoicesService.invoices.revalidate();
    }, [invoicesService]);
    if (invoiceCount === undefined) {
        if (isLoading) {
            return _jsx(BillingHistorySkeleton, {});
        }
        else {
            return (_jsx("span", { style: { color: cssVar('errorColor') }, children: error
                    ? UserFriendlyError.fromAny(error).message
                    : 'Failed to load invoices' }));
        }
    }
    return (_jsxs("div", { className: styles.history, children: [_jsx("div", { className: styles.historyContent, children: invoiceCount === 0 ? (_jsx("p", { className: styles.noInvoice, children: t['com.affine.payment.billing-setting.no-invoice']() })) : (pageInvoices?.map(invoice => (_jsx(InvoiceLine, { invoice: invoice }, invoice.id)))) }), invoiceCount > invoicesService.invoices.PAGE_SIZE && (_jsx(Pagination, { totalCount: invoiceCount, countPerPage: invoicesService.invoices.PAGE_SIZE, pageNum: pageNum, onPageChange: handlePageChange }))] }));
};
const InvoiceLine = ({ invoice, }) => {
    const t = useI18n();
    const urlService = useService(UrlService);
    const open = useCallback(() => {
        if (invoice.link) {
            urlService.openPopupWindow(invoice.link);
        }
    }, [invoice.link, urlService]);
    return (_jsx(SettingRow, { name: new Date(invoice.createdAt).toLocaleDateString(), desc: `${invoice.status === InvoiceStatus.Paid
            ? t['com.affine.payment.billing-setting.paid']()
            : ''} $${invoice.amount / 100}`, children: _jsx(Button, { onClick: open, children: t['com.affine.payment.billing-setting.view-invoice']() }) }, invoice.id));
};
const BillingHistorySkeleton = () => {
    return (_jsx("div", { className: styles.billingHistorySkeleton, children: _jsx(Loading, {}) }));
};
//# sourceMappingURL=billing-history.js.map