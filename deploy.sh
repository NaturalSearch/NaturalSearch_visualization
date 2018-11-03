sshpass -p $1 ssh -o StrictHostKeyChecking=no root@$2 <<-'ENDSSH'
    cd NaturalSearch_visualization/NaturalSearch/
    docker-compose -f docker-compose.deploy.yml down
    docker rmi $(docker images -q) -f 
    docker-compose -f docker-compose.deploy.yml up 
ENDSSH