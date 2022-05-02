using Bhakti.Models.Common;

namespace Bhakti.Models.Master
{
    public class Roles : Base<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
