using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Bhakti.Helpers
{
    public static class Messages
    {
        public static IConfiguration AppSetting { get; }
        static Messages()
        {
            AppSetting = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appmessages.json")
                    .Build();
        }

        public static string StoreSpecificLabel = "";
        public static string CommanToAllStoreLabel = "";
        public static string StateSpecificLabel = "(State Specific)";
        public static string StateStoreSpecificLabel = "(State And Store Specific)";

    }
}
