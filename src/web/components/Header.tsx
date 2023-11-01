import React from 'react';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

import Link from './link/link';
import { SearchMobile } from './Search';
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons/icons';
import { PopupButton } from '@typeform/embed-react';
import { useLocation } from 'react-router-dom';

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <Popover.Button className="block pt-5 pr-5 pb-5 font-harman">
        <Link to={href}>{children}</Link>
      </Popover.Button>
    </li>
  )
}

function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>,
) {
  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center px-4 py-2 text-sm font-medium text-zinc-800">
      <div className="block">
          <div aria-hidden="true" className="h-0.5 w-5 bg-current" ></div>
          <div aria-hidden="true" className="h-0.5 w-5 bg-current mt-2"></div>
          <div aria-hidden="true" className="h-0.5 w-5 bg-current mt-2"></div>
      </div>

      <div className='ml-4'> 
        <img src="https://devnotnull-ui-production.s3.eu-west-2.amazonaws.com/media/logo.png" alt="avatar" className="" />
      </div>

      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed z-50 top-0 left-0 w-full	h-full bg-white p-8"
          >
            <div className="flex items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-zinc-500" />
              </Popover.Button>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800">
                <MobileNavItem href="/">About</MobileNavItem>
                <MobileNavItem href="/blog">Blog</MobileNavItem>
                <MobileNavItem href="/blog/tags">Tags</MobileNavItem>
                <div className="flex justify-end flex-1">
            <div className="pointer-events-auto">
              <ul className='flex px-3'>
                <li><SearchMobile/></li>
                <li><Link to='https://github.com/devisnotnull'><GitHubIcon className="h-10 pl-2 pt-2 flex-none fill-zinc-500 transition group-hover:fill-orange-500" /></Link></li>
                <li><Link to='https://github.com/devisnotnull'><LinkedInIcon className="h-10 pl-2 pt-2 flex-none fill-zinc-500 transition group-hover:fill-orange-500" /></Link></li>
                <li><PopupButton id="HTs3mlXH" style={{ fontSize: 20, margin: 0, padding:0, border: 0, width: '100%' }}><MailIcon className="h-10 pl-2 pt-2 flex-none fill-zinc-500 transition group-hover:fill-orange-500" /></PopupButton></li>
              </ul>
            </div>
          </div>
          
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

function NavItem({
  href,
  children,
  isActive,
}: {
  href: string
  children: React.ReactNode
  isActive?: boolean
}) {

  return (
    <li>
      <Link
        to={href}
        classNames={`relative block p-3 transition hover:text-orange-500 font-harman ${isActive ? 'border-b-2 border-orange-500' : ''}`}
      >
        {children}
      </Link>
    </li>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {

  const location = useLocation()

  return (
    <nav {...props}>
      <ul className="flex px-3 font-medium text-zinc-800">
        <NavItem href="/" isActive={location.pathname === ('/')}>About</NavItem>
        <NavItem href="/blog" isActive={location.pathname.includes('/blog')}>Blog</NavItem>
        <NavItem href="/blog/tags" isActive={location.pathname.includes('/blog/tags')}>Tags</NavItem>
      </ul>
    </nav>
  )
}

export function Header() {

  return (
    <header
      className="pointer-events-none relative z-50 flex flex-none flex-col"
    >
      <div
        className="top-0 z-10 pt-6"
      >
        <div
          className="top-[var(--header-top,theme(spacing.6))] w-full"
        >
          <div className="relative flex gap-4">
          <div className="flex flex-1 justify-start">
          <div className='ml-4'> 
            <img src="https://devnotnull-ui-production.s3.eu-west-2.amazonaws.com/media/logo.png" alt="avatar" className="hidden md:block h-12" />
            <MobileNavigation className="pointer-events-auto md:hidden" />
          </div>
          </div>
          <div className="flex justify-center	flex-1">
            <DesktopNavigation className="pointer-events-auto hidden md:block flex" />
          </div>
          <div className="flex justify-end flex-1">
            <div className="pointer-events-auto">
              <ul className='flex px-3'>
                <li><SearchMobile/></li>
                <li><Link to='https://github.com/devisnotnull'><GitHubIcon className="h-10 pl-2 pt-2 flex-none fill-zinc-500 transition group-hover:fill-orange-500" /></Link></li>
                <li><Link to='https://github.com/devisnotnull'><LinkedInIcon className="h-10 pl-2 pt-2 flex-none fill-zinc-500 transition group-hover:fill-orange-500" /></Link></li>
                <li><PopupButton id="HTs3mlXH" style={{ fontSize: 20, margin: 0, padding:0, border: 0, width: '100%' }}><MailIcon className="h-10 pl-2 pt-2 flex-none fill-zinc-500 transition group-hover:fill-orange-500" /></PopupButton></li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
    </header>
  )
}

