import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className='border-t-2 border-base-300'>
                <footer className="container mx-auto footer sm:place-items-center sm:footer-horizontal text-base-content p-10">
                    <aside>
                        {/* <img className='w-15' src={mainIcon} alt="" /> */}
                        <p>
                            <span className='flex items-center gap-2'>
                                <img className='w-6' src="/logo.png" alt="logo" />
                                <span className='font-bold text-xl'>FoodOshare</span></span>
                            <br />
                            FoodOshare is a platform that connects people who have excess food with those in need.
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Social Media</h6>
                        <a href='https://github.com/garodiaa' className="link link-hover" target='_blank'>Github</a>
                        <a href='' className="link link-hover" target='_blank'>LinkedIn</a>
                        <a className="link link-hover" target='_blank'>Facebook</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Contact</h6>
                        <a href='mailto:garodiaweb@gmail.com' className="link link-hover" target='_blank'>garodiaweb@gmail.com</a>
                        <a href='mailto:garodiaweb@gmail.com' className="link link-hover" target='_blank'>+8801GARODIA</a>
                        <a href='https://x.com/SouravGarodia' className="link link-hover" target='_blank'>Twiiter</a>

                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of Service</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;