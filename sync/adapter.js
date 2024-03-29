'use strict';

const superagent = require('superagent');
const { formatRaw } = require('yuque-hexo/util');
const getEtag = require('yuque-hexo/lib/qetag');
const out = require('yuque-hexo/lib/out');
const fs = require('fs')

// 获取语雀的图片链接的正则表达式
const imageUrlRegExp = /!\[(.*?)]\((.*?)\)/mg;
const imageDirName = 'source/images'



/**
 * 从markdown格式的url中获取url
 *
 * @param {string} markdownImgUrl markdown语法图片
 * @return {string} 图片url
 */
 function getImgUrl(markdownImgUrl) {
  const _temp = markdownImgUrl.replace(/\!\[(.*?)]\(/, '');
  const _temp_index = _temp.indexOf(')');
  // 得到真正的语雀的url
  return _temp.substring(0, _temp_index)
    .split('#')[0];
}


/**
 * 根据文件内容获取唯一文件名
 *
 * @param {Buffer} imgBuffer 文件buffer
 * @param {string} yuqueImgUrl 语雀图片url
 * @return {Promise<string>} 图片文件名称
 */
 async function getFileName(imgBuffer, yuqueImgUrl) {
  return new Promise(resolve => {
    getEtag(imgBuffer, hash => {
      const imgName = hash;
      const imgSuffix = yuqueImgUrl.substring(yuqueImgUrl.lastIndexOf('.'));
      const fileName = `${imgName}${imgSuffix}`;
      resolve(fileName);
    });
  });
}


/**
 * 将图片转成buffer
 *
 * @param {string} yuqueImgUrl 语雀图片url
 * @return {Promise<Buffer>} 文件buffer
 */
 async function img2Buffer(yuqueImgUrl) {
  out.info(`download image ${yuqueImgUrl}`)
  return await new Promise(async function(resolve) {
    try {
      await superagent
        .get(yuqueImgUrl)
        .set('User-Agent', 'Mozilla/5.0') 
        .buffer(true)
        .parse(res => {
          const buffer = [];
          res.on('data', chunk => {
            buffer.push(chunk);
          });
          res.on('end', () => {
            const data = Buffer.concat(buffer);
            resolve(data);
          });
        });
    } catch (e) {
      out.warn(`invalid img: ${yuqueImgUrl}`);
      out.warn(e)
      resolve(null);
    }
  });
}


/**
 * 将article中body中的语雀url进行替换
 * @param {*} article 文章
 * @return {*} 文章
 */
 async function imgDownload(article) {
  // 1。从文章中获取语雀的图片URL列表
  const matchYuqueImgUrlList = article.body.match(imageUrlRegExp);
  if (!matchYuqueImgUrlList) return article;
  const promiseList = matchYuqueImgUrlList.map(async matchYuqueImgUrl => {
    // 获取真正的图片url
    const yuqueImgUrl = getImgUrl(matchYuqueImgUrl);

    if(!fs.existsSync(imageDirName)){
      fs.mkdirSync(imageDirName)
    }
    const fileName = yuqueImgUrl.substring(yuqueImgUrl.lastIndexOf('/') + 1)

    if(!fs.existsSync(`${imageDirName}/${fileName}`)){
      const imgBuffer = await img2Buffer(yuqueImgUrl);
      if (!imgBuffer) {
        return {
          originalUrl: matchYuqueImgUrl,
          yuqueRealImgUrl: yuqueImgUrl,
          url: yuqueImgUrl,
        };
      }
  
      fs.writeFileSync(`${imageDirName}/${fileName}`,imgBuffer)
    }


    return {
      originalUrl: matchYuqueImgUrl,
      yuqueRealImgUrl: yuqueImgUrl,
      url: `images/${fileName}`,
    };
  });
  const urlList = await Promise.all(promiseList);
  urlList.forEach(function(url) {
    if (url) {
      article.body = article.body.replace(url.originalUrl, `![](${url.url})`);
    }
  });
  return article;
}


/**
 * markdown 文章生产适配器
 *
 * @param {Object} post 文章
 * @return {String} text
 */
module.exports = async function(post) {
  // 语雀img下载
  post = await imgDownload(post);
  const { body,title,created_at,updated_at } = post;

  let result =  `---\ntitle: ${title}\ndate: ${created_at}\nupdated: ${updated_at}\n`;

  let raw = formatRaw(body);
  let tagsLine = raw.trim().split('\n')[0]

  let tags = []
  let categories = undefined;
  if(tagsLine && tagsLine.startsWith("> ")){
    raw = raw.replace(tagsLine,"")
    tags = tagsLine.replace("> ","").trim().split("、");
  }
  const quoteTag = tags.map(t=>`'${t}'`);
  if(tags.length != 0){
    result += `tags: [${quoteTag}]\n` 
  }

  let categoriesLine = raw.trim().split('\n')[0]
  if(categoriesLine && categoriesLine.startsWith("> ")){
    raw = raw.replace(categoriesLine,"")
    categories = categoriesLine.replace("> ","").trim();
  }

  if(categories){
    result += `category: ${categories}\n`
  }


  let coverLine =  raw.trim().split('\n')[0]
  if(coverLine && /^!\[(.*?)]\((.*?)\)$/.test(coverLine)){
    const cover = getImgUrl(coverLine)
    result += `cover: ${cover}\n`
    raw = raw.replace(coverLine,"")
  }


  result += `---\n  \n${raw.trim()}`
  return result;
};