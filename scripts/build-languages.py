"""Build static localized pages from one Polish source and reviewed draft dictionaries."""
import html,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
DATA=ROOT/'i18n'
LANGUAGES=json.loads((DATA/'languages.json').read_text(encoding='utf-8'))
SOURCE=json.loads((DATA/'pl.json').read_text(encoding='utf-8'))
POSTS=json.loads((DATA/'posts.json').read_text(encoding='utf-8'))
BASE='https://7eot4.github.io/CODEX-19-zakon-czarnego-kalu/'
def url(code,page):
    return BASE+('' if code=='pl' else code+'/')+('' if page=='index.html' else page)
def selector(code,page,words):
    prefix='' if code=='pl' else '../'
    options=[];links=[]
    for language in LANGUAGES:
        target=prefix+('' if language['code']=='pl' else language['code']+'/')+page
        selected=' selected' if code==language['code'] else ''
        options.append(f'<option value="{target}"{selected}>{html.escape(language["name"])}</option>')
        links.append(f'<a href="{target}" hreflang="{language["code"]}">{html.escape(language["name"])}</a>')
    return f'<div class="language-switch"><label for="language">{html.escape(words["ui.language"])}</label><select id="language">'+''.join(options)+'</select><noscript><div class="language-links">'+' · '.join(links)+'</div></noscript></div>'
def build(code):
    words=json.loads((DATA/f'{code}.json').read_text(encoding='utf-8'))
    assert set(words)==set(SOURCE),(code,'Missing or extra keys',set(SOURCE)^set(words))
    for key,value in words.items():
        assert isinstance(value,str) and value.strip(),(code,key)
        assert set(re.findall(r'\{\w+\}',value))==set(re.findall(r'\{\w+\}',SOURCE[key])),(code,key,'Placeholders')
    out=ROOT if code=='pl' else ROOT/code
    out.mkdir(exist_ok=True)
    for page in ('index.html','wizytowki.html'):
        template=(DATA/f'{page}.template').read_text(encoding='utf-8')
        template=re.sub(r'\{\{([\w.]+)\}\}',lambda m:html.escape(words[m[1]],quote=True),template)
        template=template.replace('lang="pl"',f'lang="{code}"',1)
        template=template.replace('style.css?v=interactive-1','style.css?v=languages-1')
        template=template.replace('app.js?v=interactive-1','app.js?v=languages-1')
        if code!='pl':
            template=re.sub(r'((?:src|href)=")((?:assets/|style\.css|app\.js)[^"]*)"',r'\1../\2"',template)
        prefix='' if code=='pl' else '../'
        head=f'<link rel="canonical" href="{url(code,page)}">'
        head+=''.join(f'<link rel="alternate" hreflang="{l["code"]}" href="{url(l["code"],page)}">' for l in LANGUAGES)
        head+=f'<link rel="alternate" hreflang="x-default" href="{url("pl",page)}">'
        head+=f'<link rel="stylesheet" href="{prefix}languages.css?v=1">'
        template=template.replace('</head>',head+'</head>')
        switch=selector(code,page,words)
        if page=='index.html':
            template=template.replace('</nav></header>','</nav>'+switch+'</header>')
            template=template.replace('<script src=', '<script src="locale.js?v=languages-1"></script><script src=',1)
            if code!='pl':template=template.replace('</footer>','<p class="translation-note">'+html.escape(words['ui.translationNote'])+'</p></footer>')
        else:
            template=template.replace('<h1>',switch+'<h1>',1)
            template=template.replace('</style>','.language-switch{margin:24px 0;display:flex;align-items:center;gap:12px}.language-switch label{margin:0}.language-switch select{padding:10px;color:#e8e6e0;background:#1b2022;border:1px solid #353a3b;max-width:100%;font:inherit}@media print{.language-switch{display:none}}html:not([lang="pl"]) .card h2{font-size:16pt}html:not([lang="pl"]) .card p{font-size:6.5pt}</style>')
            if code!='pl':template=template.replace('</main>','</main><p class="controls translation-note">'+html.escape(words['ui.translationNote'])+'</p>')
        template=template.replace('</body>',f'<script src="{prefix}language.js?v=1"></script></body>')
        (out/page).write_text(template,encoding='utf-8')
    entries=[]
    for i,post in enumerate(POSTS):
        entries.append({'id':post['id'],'categoryId':post['category'],'category':words[post['categoryKey']],'mark':post['mark'],
            'title':words[f'p{i}.title'],'intro':words[f'p{i}.intro'],
            'body':[words[f'p{i}.b{j}'] for j in range(post['bodyCount'])]})
    payload={'code':code,'messages':{k[3:]:v for k,v in words.items() if k.startswith('ui.')},'entries':entries}
    (out/'locale.js').write_text('window.ZCK_LOCALE='+json.dumps(payload,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')+';\n',encoding='utf-8')
    print('BUILT',code,len(words),'strings,',len(entries),'articles')
if __name__=='__main__':
    for language in LANGUAGES:build(language['code'])
