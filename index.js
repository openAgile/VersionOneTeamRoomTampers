// ==UserScript==
// @name         VersionOne Super Title Always on Cards
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        https://host/YourInstance/TeamRoom.mvc/Show/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js
// ==/UserScript==
(function() {
    'use strict';
    const v1Instance = 'YourInstance';
    const swimlaneSelector = '.group-by-header';
    $(document).arrive(swimlaneSelector, function() {
        const $swimlanes = $(swimlaneSelector);
        
        const isCollapsedByIndex = {};
        $swimlanes.each((index, element) => {
            const $swimlaneHeader = $(element);
            isCollapsedByIndex[index] = false;

            $swimlaneHeader.on('click', function(event) {
                const $swimlane = $swimlaneHeader.next();

                const nextState = !isCollapsedByIndex[index];
                isCollapsedByIndex[index] = nextState;

                $swimlane.children().css('display', nextState ? 'none' : 'table-cell');
            })
        });
    });
    
    const paperIcon = 'data:image/png;base64,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';    
    $(document).arrive(".story-card", function() {
        const story = $(this);
        const numberEl = story.find('.number');
        const number = numberEl.text().trim();
        axios.post(`/${v1Instance}/query.v1`, {
            "from": "Workitem",
            "where": {
                "Number": number
            },
            "select": [
                "Super.Name",
                {
                    "from": "Super.Attachments",
                    "where": {
                        "Name": "Avatar"
                    },
                    "select": [
                        "Filename"
                    ]
                },
                {
                    "from": "Super.Links",
                    "where": {
                        "Name": "Paper Doc"
                    },
                    "select": ["URL"]
                }
            ]
        })
        .then(function (response) {
            const resp = response.data[0][0];
            let superName = resp['Super.Name'];
            let img = '';
            let dblink = '';
            try {
                const avatar = resp['Super.Attachments'][0];
                const attachmentId = avatar._oid.substring("Attachment:".length);
                const filename = avatar.Filename;
                const url = `/${v1Instance}/attachment.img/${attachmentId}/${filename}`;
                img = `<img src='${url}' />`;
            } catch (e) {
                img = '&nbsp;';
            }
            try {
                const link = resp['Super.Links'][0];
                const url = link.URL;
                dblink = `<div class='super-related-links'><a href='${url}' target='_blank'><img src='${paperIcon}' /></a></div>`;
            } catch(e) {
            }
            if (superName === null) superName = 'None';
            if (dblink !== '') story.append(dblink);
            story.append(`<div class="super-title">${img}<span>${superName}</span></div>`);
        })
        .catch(function (error) {
            console.log(error);
        });
    });
})();
