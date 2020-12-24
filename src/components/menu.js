import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  LEI_SITE,
} from '../constants';

import {
  Drawer,
  Layout,
  Menu,
  Row,
  Typography,
} from 'antd';
const { Title, Paragraph } = Typography;

export default function Example() {
  const [openDrawer, toggleDrawer] = useState(false);

  const {Header} = Layout;
  
  const showDrawer = () => {
    toggleDrawer(true);
  };

  const onClose = () => {
    toggleDrawer(false);
  };

  const onChangeLanguage = () => {
    const selectedLocale = localStorage.getItem('locale');
    // setCurrentLocale(selectedLocale);
    if (selectedLocale === 'zh') {
      localStorage.setItem('locale','en')
    } else {
      localStorage.setItem('locale', 'zh');
    }

    window.location.reload();
 }

//  const defaultLocale = localStorage['locale'] ? localStorage['locale'] : 'en'; // English is default locale if none //is set
//  const [currentLocale, setCurrentLocale] = useState(defaultLocale);

  return (
    <Header className='header'>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
        <Menu.Item key='headerItem1'><FormattedMessage id='mkt_breadth' /></Menu.Item>
        <Menu.Item key='headerItem2'><a href={LEI_SITE} target={'_blank'} rel='noreferrer'><FormattedMessage id='menu.lei' /></a></Menu.Item>
        <Menu.Item key='headerItem3'><a href={'https://discord.gg/HZabmnG3PS'} target={'_blank'} rel='noreferrer'><FormattedMessage id='menu.community' /></a></Menu.Item>
        <Menu.Item key='headerItem4' onClick={ showDrawer } ><FormattedMessage id='menu.join' /></Menu.Item>
        <Menu.Item key='headerItem5' style={{ float: 'right' }} onClick={ onChangeLanguage } ><FormattedMessage id='menu.intl' /></Menu.Item>
      </Menu>
      
      <Drawer
        title='加入我们/合作'
        placement='left'
        closable={false}
        onClose={ onClose }
        visible={ openDrawer }
      >
        <Row justify='center' align='top'>
          <Title>加入</Title>
          <Paragraph key='drawerParagraph1'>
            目前急缺前端工程师，vue/react 均可, 请不要犹豫，直接发送邮件或者
            <a target={'_blank'} rel={'noreferrer'} href='https://forms.gle/EFfrjG9xAbGdGHwk9'> 填写表单</a>
          </Paragraph>
          <Paragraph key='drawerParagraph2' copyable={{ tooltips: false }}>kenteb@outlook.com</Paragraph>

          <Title>合作</Title>
          <Paragraph key='drawerParagraph3'>
            目前收入来源仅来自网友们的热心捐助，我们深知捐助不是长久之计，网站的运营和开需要一定的费用来维持，如果有合作的机会请联系我们。
          </Paragraph>
          <Paragraph copyable={{ tooltips: false }}>kenteb@outlook.com</Paragraph>
        </Row>
      </Drawer>
    </Header>
   );
 }
