
'''mkdir -p $HOME/docker/volumes/postgres'''
'''docker pull postgres'''
'''docker volume create pgdata'''
'''docker run --rm -d -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres'''
docker build -t dod .
docker run -P --rm dod
docker run -it dod sh   
