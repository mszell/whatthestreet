cities=( "berlin" "london" "boston" "johannesburg" "moscow" "stuttgart" "amsterdam" "budapest" "copenhagen" "rome" "singapore" "tokyo" "barcelona" "beijing" "helsinki" "hongkong" "jakarta" "newyork" "portland" "sanfrancisco" "vienna" "chicago" "losangeles" )

for city in "${cities[@]}"
do
  docker exec -it mongo /usr/bin/mongorestore --db ${city}_coiled_2 /dump/${city}_coiled_2 --verbose --numParallelCollections 1
  rm -rf ~/wts/dump/${city}_coiled_2/
done
