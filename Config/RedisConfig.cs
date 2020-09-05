using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalrRedis.Config
{
    public class RedisConfig
    {
        public const string RedisConfigKey = "RedisConfig";
        public bool UseAsBackplane { get; set; }
        public Settings Settings { get; set; }
    }
}
