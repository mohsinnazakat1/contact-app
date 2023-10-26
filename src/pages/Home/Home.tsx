import React, { useRef, useState, useEffect } from 'react';
import './home.css';
import axios from 'axios';
import Folks from '../../assets/svgs/folks.svg';
import FolksS from '../../assets/svgs/folksS.svg';
import { ActionSheet, Toast, DotLoading } from 'antd-mobile';
import type {
    Action,
    ActionSheetShowHandler,
} from 'antd-mobile/es/components/action-sheet';
import { AppIcon, TickIcon, SettingIcon } from '../../assets/svgs/icons';
import { pageDataProps, device } from '../../types/index';

type SubProps = {
    handleDelete: () => void,
    handleLogout: () => void,
};

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageData, setPageData] = useState<pageDataProps>({
        id: null,
        platform: '',
        price: '',
        bulletPoints: [],
        subscriptionId: '',
        subtitle: '',
        title: '',
        interval: '',
        googleBasePlanId: '',
    });
    // const [deviceRequest, setDeviceRequest] = useState<device>({
    //     platform: '',
    //     subscriptionType: '',
    // });

    // useEffect(() => {
    //     if (deviceRequest.platform !== '') {
    //         const { platform, subscriptionType } = deviceRequest;
    //         getSubscription(platform, subscriptionType);
    //     };
    // }, [deviceRequest]);

    useEffect(() => {
        // if (window?.android) {
        //     const subscriptionType = window?.android?.getSubscriptionType();
        //     const platform = window?.android?.getPlatform();

        //     setDeviceRequest({ platform, subscriptionType });
        // };
        getSubscription(window?.android?.getSubscriptionType(), window?.android?.getPlatform());
    }, []);

    const getSubscription = async (platform: String, subscriptionType: String) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/subscription-type?platform=${platform}&subscriptionType=${subscriptionType}`).then(res => {
                return res;
            }).catch(error => {
                return error;
            });

            const { status, data } = res;

            if (status == 200) {
                console.log('subscription working', data);
                setPageData(data[0]);
                setIsLoading(false);
            } else {
                console.log('Not working');
            };

        } catch (error) {
            console.log('somthing went wrong');
        };
    };

    const handlePerMonthAmount = () => {
        if (window?.android) {
            window?.android?.clickedOnPerMonthSubscription();
        } else {
            window?.webkit?.messageHandlers?.month?.postMessage(process.env.IOS_PM);
        };
    };

    const handlePerAnumAmount = () => {
        if (window?.android) {
            window?.android?.clickedOnPerYearSubscription();
        } else {
            window?.webkit?.messageHandlers?.year?.postMessage(process.env.IOS_PY);
        };
    };

    const handleDelete = () => {
        if (window?.android) {
            window?.android?.clickedOnDeleteAccountBtn();
        } else {
            window?.webkit?.messageHandlers?.deleteAccount?.postMessage('1');
        };

    };

    const handleLogout = () => {
        if (window?.android) {
            window?.android?.clickedOnLogoutBtn();
        } else {
            window?.webkit?.messageHandlers?.logOut?.postMessage('01');
        };

    };

    return (
        <>
            <div className='app-page'>
                {
                    isLoading ? <>
                        <div className='app-loading'>
                            <DotLoading color='white' />
                        </div>
                    </> : <>
                        <div className='home-page'>
                            <div className='banner'>
                                <div className='banner-logo'>
                                    <AppIcon />
                                    <div className='banner-text'>
                                        <p className='FNS-20-N700 text-white'>{pageData?.title?.slice(0, pageData?.title.indexOf(' of'))}</p>
                                        <p className='FNS-30-N700 text-white'>{pageData?.title?.slice(pageData?.title.indexOf(' of') + 1)}</p>
                                        {/* <p className='FNS-20-N700 text-white'>Experience a new way</p>
                                        <p className='FNS-30-N700 text-white'>of meeting people in real life</p> */}
                                    </div>
                                </div>
                                <picture>
                                    <source media="(min-width: 414px)" srcSet={Folks} className='app' />
                                    <source media="(min-width: 411px)" srcSet={FolksS} className='app' />
                                    <source media="(min-width: 390px)" srcSet={Folks} className='app' />
                                    <source media="(min-width: 375px)" srcSet={FolksS} className='app' />
                                    <img src={Folks} alt="IfItDoesntMatchAnyMedia" className='app' />
                                </picture>
                            </div>
                            <div className='page-detail'>
                                <div className='info-list'>
                                    {
                                        pageData?.bulletPoints?.map(item => {
                                            return (
                                                <div className='info-list-item'>
                                                    <div><TickIcon /></div>
                                                    <p className='FNS-14-N500 text-white'>{item}</p>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <div className='info-list-item'>
                                        <div><TickIcon /></div>
                                        <p className='FNS-14-N500 text-white'>Get live notifications when people are close-by</p>
                                    </div>
                                    <div className='info-list-item'>
                                        <div><TickIcon /></div>
                                        <p className='FNS-14-N500 text-white'>Unlimited number of swipes & chats</p>
                                    </div>
                                    <div className='info-list-item'>
                                        <div><TickIcon /></div>
                                        <p className='FNS-14-N500 text-white'>AI helper tool to break the ice with new matches</p>
                                    </div> */}
                                </div>
                                <div className='info-heading'>
                                    <p className='FNS-24-N800 text-white text-uppercase'>{pageData?.subtitle}</p>
                                </div>
                                <div className='page-bottom'>
                                    <div className='btn-section'>
                                        <button className='btn btn-unfill' onClick={handlePerMonthAmount}>
                                            <p className='text-white'>
                                                <span className='price'>$0</span>
                                                <span className='price-cents'>.99</span><br />
                                                <span className='price-text'>per month</span>
                                            </p>
                                        </button>
                                        <p className='FNS-16-N800 text-white text-uppercase'>Or</p>
                                        <button className='btn btn-fill' onClick={handlePerAnumAmount}>
                                            <p className=''>
                                                <span className='price'>$9</span>
                                                <span className='price-cents'>.99</span><br />
                                                <span className='price-text'>per year</span>
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='home-page-sections'>
                            <div className='bottom-info'>
                                <p className='FNS-12-N400 text-white'>
                                    Your subscription will auto-renew at the end of the subscription period, unless cancelled 24 hours in advance or during the free trial period. The fee is charged to your iTunes account at confirmation of purchase. You may manage vour subscriptions and turn off the auto-renewal by going to your Account Settings. No cancellation of the current subscription is allowed during active subscription period. By joining you accept our
                                    &nbsp;<span className='text-underline cursor-pointer'>Terms of Use and Privacy Policy</span>.
                                </p>
                            </div>
                            <div className='bottom-setting'>
                                <Imperative handleDelete={handleDelete} handleLogout={handleLogout} />
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
};

const Imperative = ({ handleDelete, handleLogout }: SubProps) => {
    const handler = useRef<ActionSheetShowHandler>();
    const actions: Action[] = [
        {
            text: '',
            key: 'delete',
            description: <button className='action-btn btn-delete FNS-16-N400' onClick={handleDelete}>Delete account</button>
        },
        {
            text: '',
            key: 'logout',
            description: <button className='action-btn btn-logout FNS-16-N400' onClick={handleLogout}>Log Out</button>
        }
    ];

    return (
        <p
            className='setting-icon'
            onClick={() => {
                handler.current = ActionSheet.show({
                    actions,
                    onClose: () => {
                        Toast.show('Close')
                    },
                })
            }}
        >
            <SettingIcon />
        </p>
    )
}