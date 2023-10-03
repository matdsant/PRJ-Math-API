#!/bin/bash
image_name="projetoapi:lts"
container_name="projetoapi"

if sudo docker container inspect "$container_name" &> /dev/null; then
    echo "Removendo contêiner existente: $container_name"
    sudo docker container stop "$container_name"
    sudo docker container rm "$container_name"
fi

if sudo docker image inspect "$image_name" &> /dev/null; then
    echo "Removendo imagem existente: $image_name"
    sudo docker image rm "$image_name"
fi

echo "Construindo imagem: $image_name"
sudo docker build -t "$image_name" .

echo "Iniciando contêiner: $container_name"
sudo docker run -d --name "$container_name" -p 80:80 "$image_name"

