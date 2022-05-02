using Bhakti.Models.Common;
using System;
using System.Collections.Generic;

namespace Bhakti.Models.Master
{
    public class State : Base<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
