module.exports = { // 모듈로 내보내기
    HTML : function(name, list, body, control) {
        console.log(list)
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
            <h1><a href="/">Your Profile!</a></h1>
            <!-- 메뉴 부분 -->
            ${list}
            ${body}
            ${control}
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
                <p><input type="text" name="title" placeholder="name"></p>
                <p><input type="text" name="age" placeholder="age"></p>
                <p><input type="text" name="school" placeholder="school"></p>
                <p><textarea name="description" placeholder="Your Introduction"></textarea></p>
                <button type="submit">send</button>
            </form>`
    },
    update : function(name, age, school, content) {
        return `
            <form action="/update_process" method="post">
                <p><input type="text" name="title" placeholder="name" value="${name}"></p>
                <p><input type="text" name="age" placeholder="age" value="${age}"></p>
                <p><input type="text" name="school" placeholder="school" value="${school}"></p>
                <p><textarea name="description" placeholder="Your Introduction" value="${content}"></textarea></p>
                <p><input type="hidden" name="id" placeholder="title" value="${name}"></p> 
                <button type="submit">send</button>
            </form>`
            // hidden: 파일 이름이 바뀔 수도 있으니까, 원래 파일 이름을 기억하기 위해서 쓰임
    }
}