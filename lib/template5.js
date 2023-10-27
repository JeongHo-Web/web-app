module.exports = { // 모듈로 내보내기
    HTML : function(name, list, body) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${name}</title>
        </head>
        <body>
            <h1><a href="/">선린인터넷고등학교</a></h1>
            <!-- 메뉴 부분 -->
            ${list}
            <a href="/create">create</a>
            ${body}
        </body>
        </html>
    `
    }, 
    list : function(files) {
        let list = '<ol>';
        for(i=0;i<files.length;i++) {
            list = list + `<li><a href="?name=${files[i]}">${files[i]}</a></li>`;
        }
        list = list + '</ol>';
        return list;
    },
    create : function() {
        return `
            <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p><textarea name="description" placeholder="description"></textarea></p>
                <button type="submit">send</button>
            </form>`
    }
}

