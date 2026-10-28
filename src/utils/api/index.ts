import { LoginRes, LoginType } from '@/app/(auth)/login/_schemas/login.schema';
import { SignupType } from '@/app/(auth)/sign-up/_schemas/sign-up.schema';
import { AddActiveTradeSignalDTO } from '@/app/(dashboard)/admin/active_trade_signal/_schemas/add-active-trade-signal.schema';
import { EditActiveTradeSignalSchema } from '@/app/(dashboard)/admin/active_trade_signal/_schemas/edit-active-trade-signal.schema';
import { AddBlogDTO } from '@/app/(dashboard)/admin/blogs/_schemas/add-blog.schema';
import { AddChildCategoryDTO } from '@/app/(dashboard)/admin/categories/[categoryId]/[subCategoryId]/_schemas/add-child-category.schema';
import { EditChildCategoryDTO } from '@/app/(dashboard)/admin/categories/[categoryId]/[subCategoryId]/_schemas/edit-child-category.schema';
import { AddSubCategoryDTO } from '@/app/(dashboard)/admin/categories/[categoryId]/_schemas/add-sub-category.schema';
import { EditSubCategoryDTO } from '@/app/(dashboard)/admin/categories/[categoryId]/_schemas/edit-sub-category.schema';
import { AddCategoryDTO } from '@/app/(dashboard)/admin/categories/_schemas/add-category.schema';
import { EditCategoryDTO } from '@/app/(dashboard)/admin/categories/_schemas/edit-category.schema';
import { AddCompanyDTO } from '@/app/(dashboard)/admin/companies/_schemas/add-company.schema';
import { EditCompanyDTO } from '@/app/(dashboard)/admin/companies/_schemas/edit-company.schema';
import { AddDividendsDTO } from '@/app/(dashboard)/admin/dividends/_schemas/add-dividends.schema';
import { EditDividendsSchema } from '@/app/(dashboard)/admin/dividends/_schemas/edit-dividends.schema';
import { AddGrowthsDTO } from '@/app/(dashboard)/admin/growths/_schemas/add-growth.schema';
import { EditGrowthDTO } from '@/app/(dashboard)/admin/growths/_schemas/edit-growth.schema';
import { AddHighConvictionDTO } from '@/app/(dashboard)/admin/high_convictions/_schemas/add-high-conviction.schema';
import { EditHighConvictionDTO } from '@/app/(dashboard)/admin/high_convictions/_schemas/edit-high-conviction.schema';
import { AddPastInvestmentDTO } from '@/app/(dashboard)/admin/past_investments/_schemas/add-past-investment.schema';
import { EditPastInvestmentSchema } from '@/app/(dashboard)/admin/past_investments/_schemas/edit-past-investment.schema';
import { AddPastTradeDTO } from '@/app/(dashboard)/admin/past_trades/_schemas/add-past-trade.schema';
import { EditPastTradeSchema } from '@/app/(dashboard)/admin/past_trades/_schemas/edit-past-trade.schema';
import { AddPriceItemDTO } from '@/app/(dashboard)/admin/pricings/[id]/_schemas/add-price-item.schema';
import { EditPriceItemDTO } from '@/app/(dashboard)/admin/pricings/[id]/_schemas/edit-price-item.schema';
import { AddReportDTO } from '@/app/(dashboard)/admin/reports/_schemas/add-report.schema';
import { EditReportDTO } from '@/app/(dashboard)/admin/reports/_schemas/edit-report.schema';
import { AnswerSchema } from '@/app/(dashboard)/admin/tickets/[id]/_schemas/add-new-answer.schema';
import { AddVideoCategoryDTO } from '@/app/(dashboard)/admin/videos/_schemas/add-video-category.shcema';
import { AddVideoDTO } from '@/app/(dashboard)/admin/videos/_schemas/add-video.schema';
import { EditVideoCategoryDTO } from '@/app/(dashboard)/admin/videos/_schemas/edit-video-category.schema';
import { EditVideoDTO } from '@/app/(dashboard)/admin/videos/_schemas/edit-video.schema';
import { AddLandingDTO } from '@/app/(dashboard)/author/landings/_schemas/add-landing.schema';
import { EditLandingDTO } from '@/app/(dashboard)/author/landings/_schemas/edit-landing.schema';
import { MessageSchema } from '@/app/(dashboard)/dashboard/tickets/_schemas/add-new-message.schema';
import { TicketSchema } from '@/app/(dashboard)/dashboard/tickets/_schemas/add-new-ticket.schema';
import {
    AddNoteDTO,
    EditNoteDTO,
} from '@/app/(root)/blogs/[title]/_schemas/add-note.schema';
import { sendContactDTO } from '@/app/(root)/contact-us/_schemas/send-contact.schema';
import axios from 'axios';
import { toast } from 'sonner';
import { baseURL } from '../constants/global';
import { getCookieAction } from '../funcs/cookie';
import objectToFormData from '../funcs/object-to-formData';
import { ActiveTradeSignal } from '../types/DTO/active-trade-signal.interface';
import { AddSeo, EditSeo } from '../types/DTO/add-seo.interface';
import { AdminCategories } from '../types/DTO/admin-categories.interface';
import {
    AdminCompany,
    AdminSingleCompany,
} from '../types/DTO/admin-companies.interface';
import {
    AdminChildCategory,
    AdminSubCategories,
} from '../types/DTO/admin-sub-categories.interface';
import { VideoCategory } from '../types/DTO/admin-video.interface';
import { Blogs, SingleBlogRes } from '../types/DTO/blogs.interface';
import {
    AddBookmarkReq,
    BookmarksList,
} from '../types/DTO/bookmarks.interface';
import { Category } from '../types/DTO/categories.interface';
import { ChildCategoryData } from '../types/DTO/child-category.interface';
import { CompanyReports } from '../types/DTO/company-reports.interface';
import { Contact } from '../types/DTO/contacts.interface';
import { Dividends } from '../types/DTO/dividends.interface';
import { Company, GetMeResponse } from '../types/DTO/get-me.interface';
import { Growths } from '../types/DTO/growths.interface';
import { HighConviction } from '../types/DTO/high-conviction.interface';
import { ApiError } from '../types/DTO/http-errors-interface';
import { DashboardLanding } from '../types/DTO/landing.interface';
import { MediasResponse } from '../types/DTO/media.interface';
import { MenuCategory } from '../types/DTO/menu-categories.interface';
import { Note } from '../types/DTO/notes.interface';
import { Notification } from '../types/DTO/notifications.interface';
import { PastInvestment } from '../types/DTO/past-investment.interface';
import { PastTrades } from '../types/DTO/past-trades.interface';
import {
    AddPopupType,
    EditPopupType,
    GetPopupRequestType,
} from '../types/DTO/popup.interface';
import {
    Price,
    PricingResponse,
    SinglePrice,
} from '../types/DTO/pricings.interface';
import {
    AddRedirect,
    EditRedirect,
    Redirect,
} from '../types/DTO/redirect.interface';
import { AdminReport } from '../types/DTO/reports.interface';
import { Schema } from '../types/DTO/schema.interface';
import { SingleTicket, Ticket } from '../types/DTO/tickets.interface';
import { UserPackageStatus } from '../types/DTO/user-package-status.interface';
import { UserResponse } from '../types/DTO/users.interface';
import {
    errorHandler,
    networkErrorStrategy,
    unhandledExceptionStrategy,
} from './http-error-strategies';
import { CreateLeadType, LeadListItem } from '../types/DTO/lead.interface';

const httpService = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    // withCredentials حذف شد
});

httpService.interceptors.response.use(
    (response) => {
        return response.data.data;
    },
    (error) => {
        if (error?.response) {
            const statusCode = error?.response?.status;
            if (statusCode >= 400) {
                const errorData: ApiError = error.response?.data;
                if (!!error?.response?.data?.errors) {
                    Object.entries(error?.response?.data?.errors).map(
                        ([key, value]) => toast.error(`${key}: ${value}`),
                    );
                }
                const handler =
                    errorHandler[statusCode] || unhandledExceptionStrategy;
                handler(errorData);
            }
        } else {
            // نمایش پیام دقیق‌تر در صورت بروز خطای شبکه یا CORS
            console.error('Network/CORS Error:', error?.message);
            networkErrorStrategy();
        }
    },
);
httpService.interceptors.request.use(
    async (config) => {
        const { value: token } = await getCookieAction('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
// auth
// forget/password /verify/forgot/password /reset/password
const auth = {
    signUp: (data: SignupType): Promise<void> =>
        httpService.post('/register', data),
    login: (data: LoginType): Promise<LoginRes> =>
        httpService.post('/login', data),
    getMe: (): Promise<GetMeResponse> => httpService.get('/dashboard'),
    logout: (): Promise<void> => httpService.get('/logout'),
    sendOtp: (data: any) => httpService.post('/send/otp', data),
    verifyOtp: (data: any) => httpService.post('/verify-mobile', data),
    verifyEmail: (data: any) => httpService.post('/verify-email', data),
    editProfile: (data: any) => httpService.post('/edit/profile', data),
    editPassword: (data: any) =>
        httpService.post('/edit/password', { ...data, _method: 'PUT' }),
    forgotPassword: (data: any) => httpService.post('/forget/password', data),
    verifyForgotPassword: (data: any) =>
        httpService.post('/verify/forget/password', data),
    resetPassword: (data: any) =>
        httpService.post('/reset/password', { ...data, _method: 'PUT' }),
};

const categories = {
    getAll: (): Promise<Category[]> => httpService.get('/categories'),
    add: (data: AddCategoryDTO): Promise<void> =>
        httpService.post('/add/category', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/category/${id}`),
    update: (data: EditCategoryDTO): Promise<void> =>
        httpService.post('/edit/category', data),
    getOne: (id: number): Promise<AdminCategories> =>
        httpService.get(`/admin/category/${id}`),
};

const subCategories = {
    add: (data: AddSubCategoryDTO): Promise<void> =>
        httpService.post('/add/sub/category', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/sub/category/${id}`),
    update: (data: EditSubCategoryDTO): Promise<void> =>
        httpService.post('/edit/sub/category', data),
    getOne: (id: number): Promise<AdminSubCategories> =>
        httpService.get(`/admin/sub_category/${id}`),
};

const childCategories = {
    getAll: (): Promise<AdminChildCategory[]> =>
        httpService.get('/admin/child/categories'),
    add: (data: AddChildCategoryDTO): Promise<void> =>
        httpService.post('/add/child/category', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/child/category/${id}`),
    update: (data: EditChildCategoryDTO): Promise<void> =>
        httpService.post('/edit/child/category', data),
    getOne: (alias: string): Promise<ChildCategoryData> =>
        httpService.get(`/child/category/${alias}`),
};

const companies = {
    getAll: (): Promise<AdminCompany[]> => httpService.get('/admin/companies'),
    getAllForUser: (search: string): Promise<Company[]> =>
        httpService.get(`/companies?name=${search}`),
    add: (data: AddCompanyDTO): Promise<void> =>
        httpService.post('/add/company', data),
    update: (data: EditCompanyDTO): Promise<void> =>
        httpService.post('/edit/company', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/company/${id}`),
    getOne: (alias: string): Promise<AdminSingleCompany> =>
        httpService.get(`/company/${alias}`),
};

const notifications = {
    getAll: (): Promise<Notification[]> => httpService.get('/notifications'),
    readAll: () => httpService.get('/read/all/notifications'),
};

const blogs = {
    getAll: (page: any): Promise<Blogs> =>
        httpService.get(`/all/blogs?page=${page}`),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/blog/${id}`),
    deleteAttachment: (id: number) =>
        httpService.delete(`/delete/attached/blog/${id}`),
    add: (data: AddBlogDTO): Promise<void> =>
        httpService.post('/add/blog', data),
    update: (data: AddBlogDTO): Promise<void> =>
        httpService.post('/edit/blog', data),
    getOne: (alias: string): Promise<SingleBlogRes> =>
        httpService.get(`/blog/${alias}`),
    addChildCategory: (data: any): Promise<void> =>
        httpService.post('/add/blog/child_category', data),
    deleteChildCategory: (id: any): Promise<void> =>
        httpService.delete(`/delete/blog/child_category/${id}`),
};

const pricings = {
    getAll: (): Promise<Price[]> => httpService.get('/admin/pricings'),
    getOne: (id: number): Promise<SinglePrice> =>
        httpService.get(`/admin/pricing/${id}`),
    getAllForUser: (type: string): Promise<PricingResponse> =>
        httpService.get(`/pricings?type=${type}`),
    addPriceItem: (data: AddPriceItemDTO): Promise<void> =>
        httpService.post('/add/service/price', data),
    update: (data: EditPriceItemDTO): Promise<void> =>
        httpService.post('/edit/service/price', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/service/price/${id}`),
};

const tickets = {
    getTickets: (): Promise<Ticket[]> => httpService.get('/user/tickets'),
    getAdminTickets: (): Promise<Ticket[]> => httpService.get('/tickets'),
    addTicket: (data: TicketSchema): Promise<void> =>
        httpService.post('/send/ticket', data),
    getTicket: (id: string): Promise<SingleTicket> =>
        httpService.get(`/user/ticket/${id}`),
    getAdminTicket: (id: string): Promise<SingleTicket> =>
        httpService.get(`/ticket/${id}`),

    userAnswer: (data: MessageSchema): Promise<void> =>
        httpService.post('/user/answer/ticket', data),
    adminAnswer: (data: AnswerSchema): Promise<void> =>
        httpService.post('/admin/answer/ticket', data),

    closeTicket: (id: number) => httpService.get(`/user/close/ticket/${id}`),
    adminCloseTicket: (id: number) =>
        httpService.get(`/admin/close/ticket/${id}`),
};

const bookmarks = {
    toggle: (data: AddBookmarkReq): Promise<void> =>
        httpService.post('/add/bookmark', data),
    list: (): Promise<BookmarksList[]> => httpService.get('/bookmarks'),
};

const notes = {
    add: (data: AddNoteDTO): Promise<void> =>
        httpService.post('/add/note', data),
    edit: (data: EditNoteDTO): Promise<void> =>
        httpService.post('/edit/note', data),
    list: (): Promise<Note[]> => httpService.get('/notes'),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/note/${id}`),
};

const reports = {
    add: (data: AddReportDTO): Promise<void> =>
        httpService.post('/add/report', data),
    getAll: (): Promise<AdminReport[]> => httpService.get('/reports'),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/report/${id}`),
    getOne: (alias: string): Promise<AdminReport> =>
        httpService.get(`/report/${alias}`),
    update: (data: EditReportDTO): Promise<void> =>
        httpService.post('/edit/report', data),
    getCompanyReports: (alias: string): Promise<CompanyReports[]> =>
        httpService.get(`/reports/company/${alias}`),
};

const dividends = {
    getAll: (): Promise<Dividends[]> => httpService.get('/dividends'),
    add: (data: AddDividendsDTO): Promise<void> =>
        httpService.post('/add/dividend', data),
    edit: (data: EditDividendsSchema): Promise<void> =>
        httpService.post('/edit/dividend', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/dividend/${id}`),
};
const growths = {
    getAll: (): Promise<Growths[]> => httpService.get('/growths'),
    add: (data: AddGrowthsDTO): Promise<void> =>
        httpService.post('/add/growth', data),
    edit: (data: EditGrowthDTO): Promise<void> =>
        httpService.post('/edit/growth', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/growth/${id}`),
};

const highConviction = {
    getAll: (): Promise<HighConviction[]> =>
        httpService.get('/high/convictions'),
    add: (data: AddHighConvictionDTO): Promise<void> =>
        httpService.post('/add/high/conviction', data),
    edit: (data: EditHighConvictionDTO): Promise<void> =>
        httpService.post('/edit/high/conviction', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/high/conviction/${id}`),
};
const pastInvestments = {
    getAll: (): Promise<PastInvestment[]> =>
        httpService.get('/past/investments'),
    add: (data: AddPastInvestmentDTO): Promise<void> =>
        httpService.post('/add/past/investment', data),
    edit: (data: EditPastInvestmentSchema): Promise<void> =>
        httpService.post('/edit/past/investment', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/past/investment/${id}`),
};
const pastTrades = {
    getAll: (): Promise<PastTrades[]> => httpService.get('/past/trades'),
    add: (data: AddPastTradeDTO): Promise<void> =>
        httpService.post('/add/past/trade', data),
    edit: (data: EditPastTradeSchema): Promise<void> =>
        httpService.post('/edit/past/trade', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/past/trade/${id}`),
};

const activeTradeSignals = {
    getAll: (): Promise<ActiveTradeSignal[]> =>
        httpService.get('/active/trade/signals'),
    add: (data: AddActiveTradeSignalDTO): Promise<void> =>
        httpService.post('/add/active/trade/signal', data),
    edit: (data: EditActiveTradeSignalSchema): Promise<void> =>
        httpService.post('/edit/active/trade/signal', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/active/trade/signal/${id}`),
};

const contacts = {
    send: (data: sendContactDTO): Promise<void> =>
        httpService.post('/send/contact', data),
    list: (): Promise<Contact[]> => httpService.get('/contacts'),
};

const menuCategories = {
    getAll: (): Promise<MenuCategory[]> => httpService.get('/categories/home'),
};

const redirects = {
    getAll: (): Promise<Redirect[]> => httpService.get('/redirects'),
    add: (data: AddRedirect): Promise<void> =>
        httpService.post('/add/redirect', data),
    edit: (data: EditRedirect): Promise<void> =>
        httpService.post('/edit/redirect', { ...data }),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/redirect/${id}`),
};

const seo = {
    add: (data: AddSeo) =>
        httpService.post('/add/seo', { ...data, index: data.index ? 1 : 0 }),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/detail/seo/${id}`),
    edit: (data: EditSeo) =>
        httpService.post('/edit/seo', {
            ...data,
            index: data.index ? 1 : 0,
            _method: 'PUT',
        }),
};

const media = {
    add: (data: FormData) => httpService.post('/add/media', data),
    getAll: (page: string | number): Promise<MediasResponse> =>
        httpService.get(`/medias?page=${page}`),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/media/${id}`),
};

const videoCategory = {
    getAll: (): Promise<VideoCategory[]> =>
        httpService.get('/video/categories'),
    add: (data: AddVideoCategoryDTO) =>
        httpService.post('/add/video/category', data),
    edit: (data: EditVideoCategoryDTO) =>
        httpService.post('/edit/video/category', {
            ...data,
            _method: 'PUT',
        }),
    getOne: (alias: string): Promise<VideoCategory[]> =>
        httpService.get(`/video/category/${alias}`),
};

const video = {
    add: (data: AddVideoDTO) =>
        httpService.post('/add/video', objectToFormData(data)),
    edit: (data: EditVideoDTO) =>
        httpService.post(
            '/edit/video',
            objectToFormData({ ...data, _method: 'PUT' }),
        ),
    delete: (id: number) => httpService.delete(`/delete/video/${id}`),
    publicGetAll: (queries?: Record<string, string>): Promise<any> => {
        const params = queries
            ? `?${new URLSearchParams(queries).toString()}`
            : '';
        return httpService.get(`/videos${params}`);
    },
};

const landing = {
    getAll: (): Promise<DashboardLanding[]> => httpService.get('/landings'),
    getOne: (alias: string): Promise<DashboardLanding> =>
        httpService.get(`/landing/${alias}`),
    add: (data: AddLandingDTO) => httpService.post('/add/landing', data),
    edit: (data: EditLandingDTO) =>
        httpService.post('/edit/landing', { ...data, _method: 'PUT' }),
};

const schema = {
    add: (data: Schema) => httpService.post('/add/schema', data),
    delete: (id: number): Promise<void> =>
        httpService.delete(`/delete/schema/${id}`),
};

const users = {
    getAll: ({ search, page }: any): Promise<UserResponse> => {
        const params = new URLSearchParams();
        params.append('search', decodeURIComponent(search));
        params.append('page', page.toString());
        return httpService.get(`/users?${params.toString()}`);
    },
    addAdmin: (data: any) =>
        httpService.post('/add/admin', { ...data, _method: 'PUT' }),
    addAuthor: (data: any) =>
        httpService.post('/add/writer', { ...data, _method: 'PUT' }),
    add: (data: any) => httpService.post('/add/user', data),
    update: (data: any) =>
        httpService.post('/admin/edit/profile', { ...data, _method: 'PUT' }),
    delete: (id: any) => httpService.delete(`/delete/user/${id}`),
};

const payment = {
    getAll: () => httpService.get('/payments'),
    add: (data: any) =>
        httpService.post('/payment', data, {
            headers: {
                'Idempotency-Key': `payment-${Date.now()}`,
            },
        }),
    getStatus: (id: any): Promise<UserPackageStatus> =>
        httpService.get(`/status/user/package/${id}`),
};

const popup = {
    getOne: (): Promise<GetPopupRequestType> => httpService.get('/popop'),
    add: (data: AddPopupType) =>
        httpService.post('/add/popop', objectToFormData(data)),
    edit: (data: EditPopupType) =>
        httpService.post(
            '/edit/popop',
            objectToFormData({ ...data, _method: 'PUT' }),
        ),
};

const lead = {
    getAll: (): Promise<LeadListItem[]> => httpService.get('/leads'),
    add: (data: CreateLeadType) => httpService.post('/add/lead', data),
};

const api = {
    auth,
    categories,
    subCategories,
    notifications,
    childCategories,
    companies,
    blogs,
    pricings,
    tickets,
    bookmarks,
    notes,
    reports,
    dividends,
    growths,
    highConviction,
    pastInvestments,
    pastTrades,
    activeTradeSignals,
    contacts,
    menuCategories,
    redirects,
    seo,
    media,
    schema,
    users,
    payment,
    videoCategory,
    video,
    landing,
    popup,
    lead,
};

export default api;
