FROM openjdk:17-jdk-alpine3.13 as build
LABEL name="myWeather"
# speed up Maven JVM a bit
# ENV MAVEN_OPTS="-XX:+TieredCompilation -XX:TieredStopAtLevel=1"
# set working directory
RUN mkdir -p /workspace/app
WORKDIR /workspace/app


COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN apk add --no-cache dos2unix
RUN dos2unix mvnw
RUN apk add --no-cache maven
RUN chmod +x mvnw
RUN ./mvnw install -DskipTests

FROM openjdk:17-jdk-alpine3.13

RUN mkdir -p /workspace/app

WORKDIR /workspace/app

COPY --from=build /workspace/app/target/myWeather-0.0.1-SNAPSHOT.jar /workspace/app

EXPOSE 8081

CMD ["java", "-jar", "myWeather-0.0.1-SNAPSHOT.jar"]