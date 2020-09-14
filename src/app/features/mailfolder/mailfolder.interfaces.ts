export interface IMailFolder {
    // #region Properties (2)

    count: number;
    name: string;
    useMock?: boolean;
    isSelected?: boolean;
    // #endregion Properties (2)
}

export interface IMail {
    // #region Properties (5)

    attachments: IAttachment[];
    date: string;
    from: string;
    isCollapased: boolean;
    subject: string;
    htmlLink?: string;
    emailLink?: string;
    // #endregion Properties (5)
}

export interface IAttachment {
    name: string;
    link: string;
}

export interface IContentSearchResults {
    // #region Properties (4)

    content: string;
    name: string;
    path: string;
    size: number;

    // #endregion Properties (4)
}
