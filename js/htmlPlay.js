// 获取类code内的展示代码
var code = document.getElementsByClassName('codeHtml');
// 获取code块
var length = code.length;
for (i = 0; i < length; i++) {
    // 匹配一行
    var codeText = code[i].innerHTML;
    var reg = new RegExp(".*\n", "g");
    var newCode = codeText.replace(reg, cCode);
    var codeHtml = "<ol>" + newCode + "</ol>"
    code[i].innerHTML = codeHtml;
}

// 匹配代码中的尖括号 替换成转义字符
function cCode($1) {
    var tag = new RegExp("<(!|/)?(.|\n)*?>", "g"), // 匹配 标签<tag>
        $1 = $1.replace(tag, cTag);
    // 处理后的一行展示代码
    codeLine = "<li><p>" + $1 + "</p></li>";
    return codeLine;
}

// 为代码中的标签添加样式
function cTag($1) {
    var tagLt = $1.match("<[^> \f\n\r\t\v]*");
    var tagRt = $1.match(">");
    var atn = $1.match(/[^ \f\n\r\t\v]+=/g);
    var atv = $1.match(/\"[^\"]*\"/g);
    // 初始化标签
    var newTagLt = "",
        newTagRt = "",
        tagName = "";
    if (atn != null && atv != null && atn.length == atv.length) {
        // 初始化属性
        var newAt = "",
            newAtn = new Array(),
            newAtv = new Array();

        // 获取标签名
        tagName = (tagLt[0].match("[^<]+"))[0];

        // 拼装atn和atv
        at = (function(atn, atv) {
            for (var i = 0; i < atn.length; i++) {
                // 为属性名添加样式
                newAtn[i] = " <span class='code_atn'>" + atn[i] + "</span>";
                // 为属性值添加样式
                newAtv[i] = "<span class='code_atv'>" + atv[i] + "</span>"
                newAt = newAt + newAtn[i] + newAtv[i];
            }
            return newAt;
        })(atn, atv);

        newTagLt = "<span\tclass='code_tag'>" + "&lt;" + tagName + "</span>";
        newTagRt = "<span\tclass='code_tag'>&gt;</span>";
        newTag = newTagLt + at + newTagRt;
    } else {
        // 获取标签名
        tagName = (tagLt[0].match("[^<]+"))[0];
        newTagLt = "<span\tclass='code_tag'>" + "&lt;" + tagName + "</span>";
        newTagRt = "<span\tclass='code_tag'>&gt;</span>"
        newTag = newTagLt + newTagRt;
    }

    return newTag;
}
// 获得工具按钮所在的code节点
function getCodeNode(toolBtn) {
    // 获得按钮的父节点
    var parentBtn = toolBtn.parentNode;

    // 获取需复制代码的根节点
    var maxNum = 5; // 最大允许跳转级数
    var num = 0; // 计数
    for (var i = 0; i < maxNum; i++) {
        if (parentBtn.classList.contains("code")) {
            break;
        } else {
            parentBtn = parentBtn.parentNode;
        }
    }
    return parentBtn;
}

// 获得元素节点
function getChildNodes(parentNode) {
    var childArr = parentNode.children || parentNode.childNodes,
        childArrTem = new Array(); //  临时数组，用来存储符合条件的节点
    for (var i = 0, len = childArr.length; i < len; i++) {
        if (childArr[i].nodeType == 1) {
            childArrTem.push(childArr[i]); // push() 方法将节点添加到数组尾部
        }
    }
    return childArrTem;
}
// 折叠
function collapseCode(toolBtn) {
    // 获得根节点ode
    var codeNode = getCodeNode(toolBtn);
    // 获得折叠按钮的子节点
    var childNode = getChildNodes(toolBtn);
    // 折叠状态：zd(折叠)|zk(展开)
    var collapseStatus = toolBtn.getAttribute('data-collapseStatus');

    if (collapseStatus == null || collapseStatus == "") {
        collapseStatus = "zk";
    }

    var codeHtml = (codeNode.getElementsByClassName('codeHtml'))[0];
    if (collapseStatus == "zk") {
        codeHtml.style.display = "none";
        childNode[1].style.display = "none";
        childNode[0].style.display = "block";
        toolBtn.setAttribute('data-collapseStatus', 'zd');
    } else {
        codeHtml.style.display = "block";
        childNode[0].style.display = "none";
        childNode[1].style.display = "block";
        toolBtn.setAttribute('data-collapseStatus', 'zk');
    }

}
