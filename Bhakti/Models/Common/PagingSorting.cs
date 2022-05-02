using Bhakti.Models.Enums;

namespace Bhakti.Models.Common
{
    public abstract class PagingSorting
    {
        public PageSize PageSize { get; set; }
        public int PageIndex { get; set; }
        public int TotalRecords { get; set; }
        public string SortBy { get; set; }
        public SortOrder SortOrder { get; set; }
    }
}
