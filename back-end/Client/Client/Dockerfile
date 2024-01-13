FROM openjdk:17-alpine
ADD target/*.jar client.jar
ENTRYPOINT ["java","-jar","client.jar"]