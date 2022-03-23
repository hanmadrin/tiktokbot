const tag = ({name,classes,datas,attributes,html}) => {
    const node = document.createElement(name);
    if(classes)
        node.className = `${classes.join(" ")}`;
    if(datas){
        const datakeys = Object.keys(datas);
        const dataValues = Object.values(datas);
        for(let i=0;i<datakeys.length;i++)
            node.setAttribute(`data-${datakeys[i]}`,dataValues[i]);
    }
    if(attributes){
        const datakeys = Object.keys(attributes);
        const dataValues = Object.values(attributes);
        for(let i=0;i<datakeys.length;i++)
            node.setAttribute(datakeys[i],dataValues[i]);
    }
    if(html)
        node.innerText = html;
    return node;
};

export default tag;