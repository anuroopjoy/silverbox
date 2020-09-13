export interface IMailFolder {
    // #region Properties (2)

    count: number;
    name: string;

    // #endregion Properties (2)
}

export interface IMail {
    // #region Properties (5)

    attachments: string[];
    date: string;
    from: string;
    isCollapased: boolean;
    subject: string;

    // #endregion Properties (5)
}
