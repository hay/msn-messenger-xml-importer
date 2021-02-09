import xmljs from 'xml-js';
import Papaparse from 'papaparse';

export class MsnXml {
    constructor(rawXml) {
        this.rawXml = rawXml;
        this.data = null;
        this.parse();
        this.messages = this.data.Log.Message.map(m => this.parseMessage(m));
        this.messagesFlat = this.messages.map(m => this.flattenMessage(m));
    }

    flattenMessage(m) {
        m = JSON.parse(JSON.stringify(m));
        m.from = m.from.join(',');
        m.to = m.to.join('');
        return m;
    }

    getCsv() {
        return Papaparse.unparse(this.messagesFlat, {
            quotes : true,
            header : true
        });
    }

    getJson() {
        return JSON.stringify(this.messages, null, 4);
    }

    parse() {
        const data = xmljs.xml2js(this.rawXml, {
            compact : true
        });

        if (!('Log' in data)) {
            throw new Error('No <Log> element. Is this a MSN XML file?');
        }

        this.data = data;
    }

    parseFriendlyName(user) {
        // Check for mulitple users
        if ('_attributes' in user) {
            return [ user._attributes.FriendlyName ];
        } else {
            return user.map(u => u._attributes.FriendlyName);
        }
    }

    parseMessage(message) {
        return {
            date : message._attributes.Date,
            datetime : message._attributes.DateTime,
            from : this.parseFriendlyName(message.From.User),
            text : message.Text._text,
            text_style : message.Text._attributes.Style,
            time : message._attributes.Time,
            to : this.parseFriendlyName(message.To.User),
        }
    }
}