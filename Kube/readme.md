### Commands to run
kubectl create namespace signalrredis

helm upgrade --install sigredis redis/ --namespace signalrredis

### Output from redis

Release "sigredis" does not exist. Installing it now.
NAME: sigredis
LAST DEPLOYED: Mon Sep  7 15:42:34 2020
NAMESPACE: signalrredis
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
** Please be patient while the chart is being deployed **
Redis can be accessed via port 6379 on the following DNS names from within your cluster:

sigredis-master.signalrredis.svc.cluster.local for read/write operations
sigredis-slave.signalrredis.svc.cluster.local for read-only operations


To get your password run:

    export REDIS_PASSWORD=$(kubectl get secret --namespace signalrredis sigredis -o jsonpath="{.data.redis-password}" | base64 --decode)

To connect to your Redis server:

1. Run a Redis pod that you can use as a client:
   kubectl run --namespace signalrredis sigredis-client --rm --tty -i --restart='Never' \
    --env REDIS_PASSWORD=$REDIS_PASSWORD \
   --image docker.io/bitnami/redis:6.0.7-debian-10-r0 -- bash

2. Connect using the Redis CLI:
   redis-cli -h sigredis-master -a $REDIS_PASSWORD
   redis-cli -h sigredis-slave -a $REDIS_PASSWORD

To connect to your database from outside the cluster execute the following commands:

    kubectl port-forward --namespace signalrredis svc/sigredis-master 6379:6379 &
    redis-cli -h 127.0.0.1 -p 6379 -a $REDIS_PASSWORD
