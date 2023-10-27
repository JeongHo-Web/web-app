const express = require('express')
const fs = require('fs')
const app = express();
const port = 3000;
const template = require('./lib/template.js')

function deleteFiles(id) {
    fs.unlink(`user/age/${id}`, (err) => { // 파일을 지움
    })
    fs.unlink(`user/school/${id}`, (err) => { // 파일을 지움
    })
    fs.unlink(`user/name/${id}`, (err) => { // 파일을 지움
    })
    fs.unlink(`user/introduce/${id}`, (err) => { // 파일을 지움
    })
}

app.get('/', (req, res) => {
    let {name} = req.query;
    const testFolder = 'user/name';
    const fs = require('fs');
    fs.readdir(testFolder, (err, files) => {
        let list = ''
        if(files === undefined) {
            
        }
        else {
            list = template.list(files);
        }
        fs.readFile(`user/age/${name}`, 'utf-8', (err, ageData) => {
            fs.readFile(`user/introduce/${name}`, 'utf-8', (err, introData) => {
                fs.readFile(`user/school/${name}`, 'utf-8', (err, schoolData) => {
                    let control = `<br><a href="/update?name=${name}"><button>update profile</button></a>
                    <form action='delete_process' method='post'>
                        <input type='hidden' name='id' value='${name}'>
                        <button type='submit'>delete</button>
                    </form>
                    `
                    let htmlData = `
                    <h2>${name}님의 프로필</h2>
                    <h3>나이: ${ageData}</h3>
                    <h3>학교: ${schoolData}</h3>
                    <h3>소개: ${introData}</h3>
                    `
                    if (name === undefined) {
                        name = 'Hello!';
                        htmlData = `<h1>Hello!</h1><p>Show your profile!</p>`
                        control = `<a href="/create"><button>create</button></a>`;
                    }
                    
                    const html = template.HTML(name, list, htmlData, control)
                    // console.log(name);
                    res.send(html);
                })
            })
        });
    });
});

app.get('/create', (req, res) => {
    fs.readdir('user/name', (err, files) => {
        const name = 'create';
        const list = template.list(files);
        const data = template.create();
        const html = template.HTML(name, list, data, '');
        res.send(html);
    })
})

app.get('/update', (req, res) => {
    let {name} = req.query; // 위에 두 코드와 같은 역할을 함.
    const testFolder = 'user/name';
    fs.readdir(testFolder, (err, files) => {
        let list = template.list(files);
        fs.readFile(`user/introduce/${name}`, 'utf-8', (err, content) => {
            fs.readFile(`user/age/${name}`, 'utf-8', (err, ageData) => {
                fs.readFile(`user/school/${name}`, 'utf-8', (err, schoolData) => {
                    let htmlData = `
                        <form action="/update_process" method="post">
                            <p><input type="text" name="title" placeholder="title" value="${name}"></p>
                            <p><input type="text" name="age" placeholder="age" value="${ageData}"></p>
                            <p><input type="text" name="school" placeholder="school" value="${schoolData}"></p>
                            <p><textarea name="description" placeholder="description">${content}</textarea></p>
                            <p><input type="hidden" name="id" placeholder="title" value="${name}"></p> 
                            <button type="submit">send</button>
                        </form>`
                    const html = template.HTML(name, list, htmlData, '')
                    const data = template.update(name, ageData, schoolData, content);
                    // console.log(name);
                    res.send(html);
                })
            })
        });
    });
})

const qs = require('querystring');
app.post('/create_process', (req, res) => {
    // res.send('성공')
    let body = ''
    req.on('data', (data) => { // post로 전송된 데이터를 잘라서 받아옴
        body = body + data
    })
    req.on('end', () => { // 데이터가 끝났을 때
        const post = qs.parse(body);
        // console.log(post);
        const title = post.title;
        const description = post.description;
        const age = post.age;
        const school = post.school;
        console.log(title)
        
        console.log(title);
        fs.writeFile(`user/introduce/${title}`, description, 'utf8', (err) => {
        })
        fs.writeFile(`user/age/${title}`, age, 'utf8', (err) => {
        })
        fs.writeFile(`user/school/${title}`, school, 'utf8', (err) => {
        })
        fs.writeFile(`user/name/${title}`, title, 'utf8', (err) => {
        })
        res.redirect(302, `/?name=${title}`) // 처리 후 다른 page로 이동
    })
})

app.post('/update_process', (req, res) => {
    let body = ''
    req.on('data', (data) => { // post로 전송된 데이터를 잘라서 받아옴
        body = body + data
    })
    let title = '';
    req.on('end', () => { // 데이터가 끝났을 때
        const post = qs.parse(body);
        const id = post.id; // id 받아오기
        title = post.title;
        const description = post.description;
        const age = post.age;
        const school = post.school;
        fs.rename(`user/name/${id}`, `user/name/${title}`, (err) => { // 파일 이름을 바꿈
            if(id !== title) {
                deleteFiles(id);
            }
            fs.writeFile(`user/name/${title}`, title, 'utf8', (err) => {
            })
            fs.writeFile(`user/introduce/${title}`, description, 'utf8', (err) => {
            }); 
            fs.writeFile(`user/age/${title}`, age, 'utf-8',(err) => {
            })
            fs.writeFile(`user/school/${title}`, school, 'utf-8', (err) => {
            });
        });
        console.log(`title is ${title}`);
        res.redirect(302, `/?name=${title}`) // 처리 후 다른 page로 이동
    })
    
})

app.post('/delete_process', (req, res) => {
    let body = ''
    req.on('data', (data) => { // post로 전송된 데이터를 잘라서 받아옴
        body = body + data
    })
    req.on('end', () => { // 데이터가 끝났을 때
        const post = qs.parse(body);
        const id = post.id; // id 받아오기
        deleteFiles(id);
        res.redirect(302, '/');
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})