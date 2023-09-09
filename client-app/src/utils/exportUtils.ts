import download from "downloadjs"
import formatXml from "xml-formatter";

export function exportObjAsJSON(args: {
    obj: any,
    filenameNoExt: string
}) {
    download(JSON.stringify(args.obj, null, 4), `${args.filenameNoExt}.json`, 'text/json');
}

export function exportTextAsXML(args: {
    text: string,
    filenameNoExt: string
}) {
    download(formatXml(args.text), `${args.filenameNoExt}.xml`, 'text/xml')
}
