module.exports = {
    title: 'DeathKnightH\'s blog',
    description: '记录一些思路和细节',
    base: '/',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            {text: '算法笔记', link: '/algorithm/'},
            {text: 'Java基础', 
             items: [
                 {text: '总览', link: '/java/'},
                 {text: '多线程', link: '/java/thread/'},
                 {text: 'JVM', link: '/java/jvm/'}
                ]},
            {text: '数据库', link: '/database/'},
            {text: '常用工具', link: '/tools/'},
            {text: '设计',
             items: [
                 {text: '设计模式', link: '/design/design_patterns/'}
                ]}
        ],
        sidebar: 'auto',
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
    }

};
