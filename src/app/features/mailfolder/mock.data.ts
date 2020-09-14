import { IMail } from './mailfolder.interfaces';

export const mockAttachmentsList = [
    'Files.zip',
    'Final.rar',
    'Finance.doc',
    'Main.exe',
    'Phone.txt',
    'Reports.7z',
    'Sample.txt',
    'Temp.txt',
    'Test.7z'
];

export const mockFromList = [
    'abhilash.pillai@hrblock.com',
    'ajith.kumar@hrblock.com',
    'anuroop.joy@hrblock.com',
    'arun.jose@hrblock.com',
    'kiran.cherian@hrblock.com'
];

export const mockMailFolders = [
    {
        name: 'Mock - Dead DDA from Tax Prep',
        count: 0,
        useMock: true,
        isSelected: false
    }
];

export function generateRandomMails(folderName: string): IMail[] {
    const len = randomNumber(10, 55);
    let mails: IMail[] = [];
    for (let i = 0; i < len; i++) {
        const date = randomDate(
            new Date(2020, 0, 1),
            new Date()
        ).toLocaleDateString();
        mails.push({
            from: mockFromList[randomNumber(0, 5)],
            subject: folderName + ' - ' + date,
            date,
            isCollapased: true,
            attachments: [
                { name: mockAttachmentsList[randomNumber(0, 8)], link: '' },
            ],
        });
    }
    mails = mails.sort((x, y) =>
        new Date(x.date) > new Date(y.date) ? -1 : 1
    );
    return mails;
}

function randomDate(start: Date, end: Date) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}
