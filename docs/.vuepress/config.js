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
            {text: 'Java基础', link: '/java/'}
        ],
        sidebar: 'auto',
        sidebarDepth: 2,
    }

};