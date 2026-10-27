'use client';
import React, { useState } from 'react';
import './style.css';
import Input from '@/components/Input';
import Search from '%/company-search.svg';
import Button from '@/components/Button';
import DividendTable from './_components/DividendTable';
import HighConvictionTable from './_components/HighConvictionTable';
import GrowthTable from './_components/GrowthTable';
import PastInvestmentsTable from './_components/PastInvestmentsTable';
import ActiveTradingSignalTable from './_components/ActiveTradingSignalTable';
import PastTradesTable from './_components/PastTradesTable';

type TabType =
    | 'DIVIDEND'
    | 'GROWTH'
    | 'HIGH'
    | 'INVESTMENTS'
    | 'SIGNALS'
    | 'TRADES';

const TAB_DATA: Record<
    TabType,
    { label: string; description: string; Component: React.ElementType }
> = {
    DIVIDEND: {
        label: 'Dividend Portfolio',
        description:
            'The ASX-listed companies in our Dividend Portfolio are strategically selected to deliver reliable dividend yields that significantly exceed current 10-year government bond rates, while also offering strong potential for long-term capital appreciation.',
        Component: DividendTable,
    },
    GROWTH: {
        label: 'Growth Portfolio',
        description:
            'The ASX-listed companies in our Growth Portfolio are strategically selected to deliver substantial medium- to long-term capital appreciation, driven by short- to mid-term catalysts with high probability of materialising. To manage downside risk, we apply disciplined stop-loss strategies informed by technical analysis and maintain vigilant oversight of evolving market sentiment surrounding each stock.',
        Component: GrowthTable,
    },
    HIGH: {
        label: 'High Conviction Buys Now',
        description:
            'The ASX-listed companies featured in our High Conviction Buys Now list are select opportunities from our Dividend and Growth portfolios that are currently trading within highly attractive price ranges. These selections are based on a combination of fundamental valuation metrics and technical analysis. We provide clear buy ranges and target prices for each stock, and you’ll receive timely email alerts whenever a stock is added to or removed from the High Conviction Buys Now list.',
        Component: HighConvictionTable,
    },
    INVESTMENTS: {
        label: 'Past Investments',
        description:
            'Past Investments are companies that were previously included in our model portfolios but are no longer under active coverage—typically following a sell recommendation issued by our team.',
        Component: PastInvestmentsTable,
    },
    SIGNALS: {
        label: 'Active Trading Signals',
        description:
            'Active Trading Signals showcases our latest trade ideas, featuring clearly defined entry and exit points derived from rigorous technical analysis. These signals are exclusively generated for companies with strong underlying fundamentals and attractive valuations, ensuring a dual- layered approach that combines technical precision with a compelling investment thesis. Each signal includes specific stop-loss and take-profit levels, and members receive timely alerts via email and SMS whenever a stock is added to or removed from the Active Trading Signals list.',
        Component: ActiveTradingSignalTable,
    },
    TRADES: {
        label: 'Past Trades',
        description:
            'Past Trades are previously issued trading signals that have since been closed, either by reaching their target levels or exiting based on our risk management strategy.',
        Component: PastTradesTable,
    },
};

const Page = () => {
    const [activeTab, setActiveTab] = useState<TabType>('DIVIDEND');
    const [search, setSearch] = useState('');

    const ActiveComponent = TAB_DATA[activeTab].Component;

    return (
        <div className='w-full'>
            <div className='tabs tabs-border flex flex-nowrap overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b pb-1'>
                {(Object.keys(TAB_DATA) as TabType[]).map((tabKey) => (
                    <input
                        key={tabKey}
                        type='radio'
                        name='portfolio_tabs'
                        className='tab beforbg-secondary whitespace-nowrap shrink-0 px-4'
                        aria-label={TAB_DATA[tabKey].label}
                        checked={activeTab === tabKey}
                        onChange={() => setActiveTab(tabKey)}
                    />
                ))}
            </div>

            <div className='bg-white rounded-20 relative overflow-hidden p-5 mt-4'>
                <Input
                    placeholder='Company Search...'
                    theme='accent'
                    icon={
                        <Button theme='secondary' shape='circle'>
                            <Search />
                        </Button>
                    }
                    iconReverse
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='py-4 h-18 rounded-full max-w-md'
                    size='lg'
                />

                <div className='mt-5 flex items-center gap-8 flex-col lg:flex-row text-gray-700 leading-relaxed'>
                    {TAB_DATA[activeTab].description}
                </div>

                {(TAB_DATA[activeTab].label === 'Active Trading Signals' ||
                    TAB_DATA[activeTab].label === 'Past Trades') && (
                    <p className='font-bold text-amber-700'>
                        (Only Premium Members Can See Short-term Trading
                        Reports)
                    </p>
                )}

                <div className='mt-6'>
                    <ActiveComponent search={search} />
                </div>
            </div>
        </div>
    );
};

export default Page;
