using System.ComponentModel;

namespace Bhakti.Models.Enums
{
    public enum Status
    {
        All = -1,
        Active = 1,
        InActive = 0
    }

    public enum ImageType
    {
        [Description("800 x 800 (w x h)")]
        Origional,
        [Description("150 x 115 (w x h)")]
        Thumbnail,
        [Description("200 x 200 (w x h)")]
        Small,
        [Description("400 x 400 (w x h)")]
        Medium,
        [Description("500 x 500 (w x h)")]
        Big,
        [Description("16 x 16 (w x h)")]
        Favicon
    }
}
